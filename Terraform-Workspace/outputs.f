output "service_account_email" {
  description = "The service account email."
  value       = module.service_accounts.service_account.email
}

output "service_account_iam_email" {
  description = "The service account IAM-format email."
  value       = module.service_accounts.iam_email
}

output "service_account_key" {
  description = "The service account key."
  value       = module.service_accounts.key
}

output "bucket_id" {
  description = "The id of the backing bucket for the registry."
  value = google_container_registry.registry.id
}