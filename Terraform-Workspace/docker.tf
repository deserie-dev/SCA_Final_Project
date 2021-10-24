resource "google_cloud_run_service" "default" {
  name     = "cloudrun-srv"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "eu.gcr.io/carlspring/carlspring/hello-spring-boot:1.0"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}