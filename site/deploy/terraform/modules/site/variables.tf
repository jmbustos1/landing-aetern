variable "name_prefix" {
  type = string
}

variable "bucket_name" {
  description = "Nombre global-único del bucket del sitio"
  type        = string
}

variable "domain_name" {
  description = "Dominio propio en Route 53 (ej. aetern.dev). Vacío = usa el dominio de CloudFront"
  type        = string
  default     = ""
}
