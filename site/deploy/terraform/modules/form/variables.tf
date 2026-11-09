variable "name_prefix" {
  type = string
}

variable "bucket_name" {
  description = "Nombre global-único del bucket de mensajes"
  type        = string
}

variable "notify_email" {
  description = "Correo que recibe el aviso de cada mensaje (se verifica en SES). Vacío = solo guarda en S3"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Dominio en Route 53 para autenticar SES (DKIM/SPF/DMARC) y enviar desde no-reply@dominio. Vacío = envía desde notify_email"
  type        = string
  default     = ""
}

variable "rate_limit" {
  description = "Máximo de envíos por IP dentro de la ventana (agresivo por defecto)"
  type        = number
  default     = 3
}

variable "rate_window_seconds" {
  description = "Duración de la ventana del rate limit, en segundos (10 min)"
  type        = number
  default     = 600
}

variable "max_concurrency" {
  description = "Tope de invocaciones simultáneas de la Lambda (backstop anti-flood)"
  type        = number
  default     = 5
}
