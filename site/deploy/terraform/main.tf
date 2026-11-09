terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.4"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

data "aws_caller_identity" "current" {}

locals {
  name_prefix = var.project_name
  # El account_id hace únicos los nombres de bucket a nivel global sin sorteos.
  suffix = data.aws_caller_identity.current.account_id
}

# ─── Sitio estático: S3 privado + CloudFront (OAC) ───────────────────────────
module "site" {
  source      = "./modules/site"
  name_prefix = local.name_prefix
  bucket_name = "${local.name_prefix}-site-${local.suffix}"
  domain_name = var.domain_name
}

# ─── Formulario: Lambda Function URL -> S3 + SES ─────────────────────────────
module "form" {
  source       = "./modules/form"
  name_prefix  = local.name_prefix
  bucket_name  = "${local.name_prefix}-forms-${local.suffix}"
  notify_email = var.notify_email
  domain_name  = var.domain_name
}

# ─── Alerta de costos (gratis). Se desactiva con alerta_email = "" ───────────
module "budget" {
  count       = var.alerta_email == "" ? 0 : 1
  source      = "./modules/budget"
  name_prefix = local.name_prefix
  limite_usd  = var.alerta_limite_usd
  email       = var.alerta_email
}
