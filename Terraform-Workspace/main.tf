terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  project = "sca-final-project-329413"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_compute_instance" "appserver" {
  name         = "primary-application-server"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }
 network_interface {
    # A default network is created for all GCP projects
    network = "default"
    access_config {
    }
  }
}

resource "google_compute_instance" "my_vm" {

  name         = "tf-tutorial-vm"

  machine_type = "f1-micro"

  zone         = "us-central1-a"

  boot_disk {

    initialize_params {

      image = "debian-cloud/debian-10"

    }

  }

  network_interface {

    network = "default"

    access_config {}

  }

}

from https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_image

resource "google_compute_image" "example" {
  name = "example-image"

  raw_disk {
    source = "https://storage.googleapis.com/bosh-gce-raw-stemcells/bosh-stemcell-97.98-google-kvm-ubuntu-xenial-go_agent-raw-1557960142.tar.gz"
  }
}
