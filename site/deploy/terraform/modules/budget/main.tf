# Alerta de presupuesto. Gratis, y es el único control que avisa ANTES de que
# llegue la factura. Cubre la cuenta entera: si algo quedó prendido de otra
# prueba, también salta.
resource "aws_budgets_budget" "mensual" {
  name         = "${var.name_prefix}-presupuesto-mensual"
  budget_type  = "COST"
  limit_amount = var.limite_usd
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.email]
  }
}
