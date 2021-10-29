terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.80.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_project_region
}

resource "google_compute_instance" "appserver" {
  name         = "primary-application-server"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-1804-lts"
    }
  }
 network_interface {
    # A default network is created for all GCP projects
    network = "default"
    access_config {
    }
  }
}