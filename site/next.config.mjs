/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nivel 0: sitio 100% estático -> S3 + CloudFront (SST/Terraform).
  output: "export",
  // Usamos <img> planos; el optimizador de next/image necesita servidor.
  images: { unoptimized: true },
  // Rutas como carpetas (/casos/exwood/index.html): amistoso con S3/CloudFront.
  trailingSlash: true,
};

export default nextConfig;
