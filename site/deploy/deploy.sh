#!/usr/bin/env bash
# Construye el sitio con el endpoint del formulario, lo sube a S3 e invalida
# la cache de CloudFront. Correr DESPUÉS de `terraform apply`.
#
#   ./deploy.sh [aws_profile]
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$(cd "$HERE/.." && pwd)"      # carpeta de la app Next (house-blend)
TFDIR="$HERE/terraform"
PROFILE="${1:-${AWS_PROFILE:-default}}"

echo "→ Leyendo outputs de Terraform…"
ENDPOINT="$(cd "$TFDIR" && terraform output -raw form_endpoint)"
BUCKET="$(cd "$TFDIR" && terraform output -raw site_bucket)"
DIST="$(cd "$TFDIR" && terraform output -raw distribution_id)"
echo "  endpoint: $ENDPOINT"
echo "  bucket:   $BUCKET"
echo "  dist:     $DIST"

echo "→ Build estático (inyectando el endpoint del formulario)…"
cd "$APP"
NEXT_PUBLIC_FORM_ENDPOINT="$ENDPOINT" npm run build

echo "→ Sync a S3…"
aws s3 sync out/ "s3://$BUCKET/" --delete --profile "$PROFILE"

echo "→ Invalidando cache de CloudFront…"
aws cloudfront create-invalidation --distribution-id "$DIST" --paths '/*' --profile "$PROFILE" >/dev/null

echo "✓ Listo. Sitio: $(cd "$TFDIR" && terraform output -raw site_url)"
