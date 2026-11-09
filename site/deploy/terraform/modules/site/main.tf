# ─── Bucket del sitio ────────────────────────────────────────────────────────
# Privado. Sirve por CloudFront con OAC; nunca queda público.
resource "aws_s3_bucket" "site" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.name_prefix}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Redirige www -> dominio principal y reescribe /ruta/ -> /ruta/index.html
# (export estático). Los assets con extensión (.pdf, .png) pasan sin tocar.
resource "aws_cloudfront_function" "rewrite" {
  name    = "${var.name_prefix}-rewrite-index"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOT
    function handler(event) {
      var req = event.request;
      var uri = req.uri;
      var host = req.headers.host ? req.headers.host.value : "";
      if (host === "www.${var.domain_name}") {
        var q = req.querystring;
        var qs = Object.keys(q).map(function (k) { return k + "=" + q[k].value; }).join("&");
        return {
          statusCode: 301,
          statusDescription: "Moved Permanently",
          headers: { location: { value: "https://${var.domain_name}" + uri + (qs ? "?" + qs : "") } },
        };
      }
      if (uri.endsWith("/")) {
        req.uri = uri + "index.html";
      } else if (uri.lastIndexOf(".") < uri.lastIndexOf("/")) {
        req.uri = uri + "/index.html";
      }
      return req;
    }
  EOT
}

# ─── Cabeceras de seguridad ──────────────────────────────────────────────────
# Next.js en export estático requiere 'unsafe-inline' para sus scripts de hidratación.
locals {
  csp = join("; ", [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' ${var.form_origin}",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ])
}

resource "aws_cloudfront_response_headers_policy" "security" {
  name = "${var.name_prefix}-security-headers"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 63072000
      include_subdomains         = true
      override                   = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    content_security_policy {
      content_security_policy = local.csp
      override                = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=()"
      override = true
    }
  }
}

# ─── Dominio: ACM + validación DNS + alias (todo por Route 53) ───────────────
locals {
  has_domain = var.domain_name != ""
  aliases    = local.has_domain ? [var.domain_name, "www.${var.domain_name}"] : []
}

# La zona hosted que creó el registro del dominio en Route 53.
data "aws_route53_zone" "this" {
  count = local.has_domain ? 1 : 0
  name  = var.domain_name
}

# Certificado (debe estar en us-east-1 para CloudFront; el provider ya lo está).
resource "aws_acm_certificate" "this" {
  count                     = local.has_domain ? 1 : 0
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

# Registros CNAME de validación, creados automáticamente en la zona.
resource "aws_route53_record" "validation" {
  for_each = local.has_domain ? {
    for dvo in aws_acm_certificate.this[0].domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  } : {}

  zone_id         = data.aws_route53_zone.this[0].zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "this" {
  count                   = local.has_domain ? 1 : 0
  certificate_arn         = aws_acm_certificate.this[0].arn
  validation_record_fqdns = [for r in aws_route53_record.validation : r.fqdn]
}

# ─── Distribución CloudFront ─────────────────────────────────────────────────
resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  default_root_object = "index.html"
  comment             = "${var.name_prefix} landing"
  price_class         = "PriceClass_100"

  aliases = local.aliases

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Managed-CachingOptimized
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite.arn
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }
  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  dynamic "viewer_certificate" {
    for_each = local.has_domain ? [1] : []
    content {
      acm_certificate_arn      = aws_acm_certificate_validation.this[0].certificate_arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1.2_2021"
    }
  }
  dynamic "viewer_certificate" {
    for_each = local.has_domain ? [] : [1]
    content {
      cloudfront_default_certificate = true
    }
  }
}

# Apunta aetern.dev y www.aetern.dev a CloudFront (registro ALIAS).
resource "aws_route53_record" "alias" {
  for_each = local.has_domain ? toset(local.aliases) : toset([])
  zone_id  = data.aws_route53_zone.this[0].zone_id
  name     = each.value
  type     = "A"
  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = "Z2FDTNDATAQYW2" # zona fija de CloudFront
    evaluate_target_health = false
  }
}

# CAA: solo Amazon (ACM) puede emitir certificados para el dominio y sus subdominios.
resource "aws_route53_record" "caa" {
  count   = local.has_domain ? 1 : 0
  zone_id = data.aws_route53_zone.this[0].zone_id
  name    = var.domain_name
  type    = "CAA"
  ttl     = 3600
  records = [
    "0 issue \"amazon.com\"",
    "0 issue \"amazontrust.com\"",
    "0 issue \"awstrust.com\"",
    "0 issue \"amazonaws.com\"",
  ]
}

# ─── Política del bucket: solo esta distribución de CloudFront puede leer ─────
data "aws_iam_policy_document" "site" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site.json
}
