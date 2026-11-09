output "function_url" {
  value = aws_lambda_function_url.form.function_url
}

output "submissions_bucket" {
  value = aws_s3_bucket.submissions.id
}

output "function_name" {
  value = aws_lambda_function.form.function_name
}
