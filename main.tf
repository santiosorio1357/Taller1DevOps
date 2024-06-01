terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = "taller4sf"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

# Habilita la API de Cloud Run
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
  disable_on_destroy = true
}

# Permitir a los usuarios no autenticados invocar el servicio
resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.run_service.name
  location = google_cloud_run_service.run_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"

  depends_on = [
    google_cloud_run_service.run_service
  ]
}

# Crear el servicio de Cloud Run para la API de NestJS
resource "google_cloud_run_service" "run_service" {
  name     = "nestjs-api"
  location = "us-east1" # Ajusta la región según tu preferencia

  template {
    spec {
      containers {
        image = "gcr.io/taller4sf/nestjs-api:latest" 
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Espera a que la API de Cloud Run esté habilitada
  depends_on = [google_project_service.run_api]
}

# Mostrar la URL del servicio
output "service_url" {
  value = google_cloud_run_service.run_service.status[0].url
}
