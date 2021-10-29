resource "google_container_registry" "registry" {
  project  = var.gcp_project_id
  location = "US"
}

resource "google_storage_bucket_iam_member" "admin" {
  bucket = google_container_registry.registry.id
  role = "roles/storage.objectAdmin"
  member = module.service_accounts.iam_email
}

resource "google_storage_bucket_iam_member" "viewer" {
  bucket = google_container_registry.registry.id
  role = "roles/storage.objectViewer"
  member = "allUsers"
}

