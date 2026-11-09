variable "aws_region" {
  description = "Región AWS. CloudFront y su certificado ACM viven en us-east-1"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "Perfil de AWS CLI a usar"
  type        = string
  default     = "default"
}

variable "project_name" {
  description = "Prefijo para nombrar los recursos"
  type        = string
  default     = "aetern"
}

variable "domain_name" {
  description = "Dominio propio en Route 53 (ej. aetern.dev). Vacío = usa el dominio de CloudFront"
  type        = string
  default     = ""
}

variable "notify_email" {
  description = "Correo que recibe el aviso de cada mensaje del formulario (se verifica en SES). Vacío = solo guarda en S3"
  type        = string
  default     = ""
}

variable "alerta_email" {
  description = "Correo para la alerta de presupuesto. Vacío desactiva la alerta"
  type        = string
  default     = ""
}

variable "alerta_limite_usd" {
  description = "Tope mensual en USD que dispara la alerta de presupuesto"
  type        = string
  default     = "10"
}
