variable "name_prefix" {
  type = string
}

variable "limite_usd" {
  description = "Tope mensual en USD que dispara la alerta"
  type        = string
}

variable "email" {
  description = "Correo para la alerta de presupuesto"
  type        = string
}
