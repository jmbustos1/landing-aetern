output "site_url" {
  description = "URL pública del sitio"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "https://${module.site.cloudfront_domain}"
}

output "cloudfront_domain" {
  value = module.site.cloudfront_domain
}

output "distribution_id" {
  value = module.site.distribution_id
}

output "site_bucket" {
  value = module.site.bucket_name
}

output "form_endpoint" {
  description = "Pon este valor en NEXT_PUBLIC_FORM_ENDPOINT al compilar el sitio"
  value       = module.form.function_url
}

output "submissions_bucket" {
  value = module.form.submissions_bucket
}

# ─── Comandos útiles (copiar/pegar) ──────────────────────────────────────────
output "cmd_leer_mensajes" {
  description = "Lista los mensajes del formulario"
  value       = "aws s3 ls s3://${module.form.submissions_bucket}/submissions/ --recursive --profile ${var.aws_profile}"
}

output "cmd_invalidar_cache" {
  description = "Invalida la cache de CloudFront tras subir cambios"
  value       = "aws cloudfront create-invalidation --distribution-id ${module.site.distribution_id} --paths '/*' --profile ${var.aws_profile}"
}
