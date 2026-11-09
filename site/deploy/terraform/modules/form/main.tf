# ─── Bucket de mensajes ──────────────────────────────────────────────────────
# Privado. Un JSON por consulta en submissions/AAAA-MM-DD/. Se leen con
# `aws s3 ls/cp`. force_destroy para que `terraform destroy` sea limpio.
resource "aws_s3_bucket" "submissions" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "submissions" {
  bucket                  = aws_s3_bucket.submissions.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "submissions" {
  bucket = aws_s3_bucket.submissions.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# ─── Rate limit por IP ───────────────────────────────────────────────────────
# Ventana fija: una fila por (ip, ventana), con TTL para que se auto-borren.
# PAY_PER_REQUEST = prácticamente gratis a este volumen.
resource "aws_dynamodb_table" "ratelimit" {
  name         = "${var.name_prefix}-form-ratelimit"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
}

# ─── Rol del Lambda (least-privilege) ────────────────────────────────────────
resource "aws_iam_role" "form" {
  name = "${var.name_prefix}-form-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "form_logs" {
  role       = aws_iam_role.form.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Solo escribir mensajes en su bucket y mandar correo por SES. Nada más.
resource "aws_iam_role_policy" "form" {
  name = "${var.name_prefix}-form-policy"
  role = aws_iam_role.form.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject"]
        Resource = ["${aws_s3_bucket.submissions.arn}/*"]
      },
      {
        Effect   = "Allow"
        Action   = ["ses:SendEmail"]
        Resource = ["*"]
      },
      {
        Effect   = "Allow"
        Action   = ["dynamodb:UpdateItem"]
        Resource = [aws_dynamodb_table.ratelimit.arn]
      }
    ]
  })
}

# ─── Lambda ──────────────────────────────────────────────────────────────────
data "archive_file" "form" {
  type        = "zip"
  source_file = "${path.module}/../../../form/handler.py"
  output_path = "${path.module}/.build/form.zip"
}

resource "aws_cloudwatch_log_group" "form" {
  name              = "/aws/lambda/${var.name_prefix}-form"
  retention_in_days = 30
}

resource "aws_lambda_function" "form" {
  function_name    = "${var.name_prefix}-form"
  role             = aws_iam_role.form.arn
  handler          = "handler.handler"
  runtime          = "python3.12"
  filename         = data.archive_file.form.output_path
  source_code_hash = data.archive_file.form.output_base64sha256
  timeout          = 10
  memory_size      = 128

  # Backstop anti-flood: nunca más de N invocaciones simultáneas. Acota el costo
  # incluso si el rate limit por IP no alcanza (ataque distribuido).
  reserved_concurrent_executions = var.max_concurrency

  environment {
    variables = {
      SUBMISSIONS_BUCKET = aws_s3_bucket.submissions.id
      NOTIFY_EMAIL       = var.notify_email
      FROM_EMAIL         = var.domain_name == "" ? var.notify_email : "no-reply@${var.domain_name}"
      RATE_TABLE         = aws_dynamodb_table.ratelimit.name
      RATE_LIMIT         = tostring(var.rate_limit)
      RATE_WINDOW        = tostring(var.rate_window_seconds)
    }
  }

  depends_on = [aws_cloudwatch_log_group.form]
}

# Endpoint público del formulario (sin API Gateway).
resource "aws_lambda_function_url" "form" {
  function_name      = aws_lambda_function.form.function_name
  authorization_type = "NONE"

  cors {
    allow_origins = ["*"]
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }
}

# ─── SES: verifica el correo destino (para poder enviártelo en sandbox) ──────
resource "aws_ses_email_identity" "notify" {
  count = var.notify_email == "" ? 0 : 1
  email = var.notify_email
}

# ─── SES: identidad de DOMINIO + DKIM/SPF/DMARC (para NO caer en spam) ────────
# Enviar desde no-reply@dominio autenticado pasa SPF/DKIM/DMARC. Todos los
# registros se crean solos en la zona de Route 53.
data "aws_route53_zone" "domain" {
  count = var.domain_name == "" ? 0 : 1
  name  = var.domain_name
}

resource "aws_ses_domain_identity" "domain" {
  count  = var.domain_name == "" ? 0 : 1
  domain = var.domain_name
}

resource "aws_ses_domain_dkim" "domain" {
  count  = var.domain_name == "" ? 0 : 1
  domain = aws_ses_domain_identity.domain[0].domain
}

# TXT de verificación de la identidad de dominio.
resource "aws_route53_record" "ses_verify" {
  count           = var.domain_name == "" ? 0 : 1
  zone_id         = data.aws_route53_zone.domain[0].zone_id
  name            = "_amazonses.${var.domain_name}"
  type            = "TXT"
  ttl             = 600
  records         = [aws_ses_domain_identity.domain[0].verification_token]
  allow_overwrite = true
}

# 3 CNAME de DKIM.
resource "aws_route53_record" "dkim" {
  count   = var.domain_name == "" ? 0 : 3
  zone_id = data.aws_route53_zone.domain[0].zone_id
  name    = "${aws_ses_domain_dkim.domain[0].dkim_tokens[count.index]}._domainkey"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_ses_domain_dkim.domain[0].dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# SPF: autoriza a SES a enviar por el dominio.
resource "aws_route53_record" "spf" {
  count           = var.domain_name == "" ? 0 : 1
  zone_id         = data.aws_route53_zone.domain[0].zone_id
  name            = var.domain_name
  type            = "TXT"
  ttl             = 600
  records         = ["v=spf1 include:amazonses.com ~all"]
  allow_overwrite = true
}

# DMARC: política de monitoreo (p=none) con reportes al correo destino.
resource "aws_route53_record" "dmarc" {
  count   = var.domain_name == "" ? 0 : 1
  zone_id = data.aws_route53_zone.domain[0].zone_id
  name    = "_dmarc.${var.domain_name}"
  type    = "TXT"
  ttl     = 600
  records = ["v=DMARC1; p=none; rua=mailto:${var.notify_email}"]
}

# Espera a que SES confirme la verificación del dominio.
resource "aws_ses_domain_identity_verification" "domain" {
  count      = var.domain_name == "" ? 0 : 1
  domain     = aws_ses_domain_identity.domain[0].id
  depends_on = [aws_route53_record.ses_verify, aws_route53_record.dkim]
}
