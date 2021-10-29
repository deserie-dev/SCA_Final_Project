# She Code Africa Final Project

This project contains 2 different CI/CD pipelines for a 3 tier MERN (MondoDB, Express, React, Node) aplication.

# The Application

Live Site deployed onto Google Cloud Platform:

[https://deserie.students.nomoreparties.site/signin](https://deserie.students.nomoreparties.site/signin)

[API](https://api.deserie.students.nomoreparties.site/signin)

This is a 3-tier application with a frontend, API and database. Inside the app/ directory are seperate folders for the app's React based frontend, and Node, Express based backend.

Functionalities:

- Allows users to register and login using an email address and password. JWT have been used to ensure users don't have to re-enter their credentials when they revisit the site. Tokens are valid for 7 days.
- Allows users to update their profile name, profile picture and description
- Allows users to post/delete/like/dislike cards. Users can delete only the cards they themselves created.
- MongoDB is used for storing user and cards data
- Helmet used to secure HTTP headers returned by Express app
- CORS protection allows access only from selected routes
- Data validation with Celebrate and Joi
- Bcrypt used for password hashing.
- Winston is used to provide error and request logging for easier maintenance

This application was created as a part of the Practicum by Yandex curriculum, a Web Developer Bootcamp I am currently enrolled in.

## Running the Project Locally

Navigate to the frontend directory and run the following commands which will install the project's dependencies and start the app in the development mode:

```
npm install
npm start
```

Open http://localhost:3000 to view it in the browser. You will see the following login screen:

![](/images/login.png)

## Technologies Used

**Frontend -** React

**Backend -** Node.js.

**Authentication -** JSON Web Tokens

**Database -** MongoDB

**Reverse-Proxy server** - NGINX

**SSL Certificate -** Let's Encrypt

This project has 2 stages - **Stage 1** for Development and **Stage 2** for production.

**Stage 1 Tools**

| Tool           | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| Circle CI      | CI/CD platform to automate build, test and deploy      |
|                |                                                        |
| Docker         | Bundles code and all its dependencies into a container |
|                |                                                        |
| Docker Compose | Lets you run multi-container applications              |
|                |                                                        |
| -------------- | ------------------------------------------------------ |

## Stage 1

<details>
<summary><b>Use Circle CI for Continuous Intergration</b></summary><p>

**Circle CI**

[CircleCI](https://circleci.com/) is a cloud-based continuous intergratiom, continuous delivery tool.

In this project I use it to ensure that nothing is wrong in the build process and for testing to ensure that the application works as expected.

1. Inside the backend directory we will write unit tests for some the Express routes. For testing HTTP calls we can use of a Node module called SuperTest and the testing framework Jest.

```
  npm install supertest jest
```

2. Inside package.json, under "Scripts," add the following script

```
  "test": "jest"
```

Since we are building a CD pipeline, we should have some tests in place.

3. Create a folder called test in the root of the backend directory. Inside the test folder create a file called test.js for writing the unit tests.

4. First import the supertest module into the test.js file.

```
  const request = require('supertest');
```

5. Create the tests (see backend/test/test.js)

6. Run

```
  npm test
```

7. You should see something like this

![](/images/test.png)

8. Signup for a [CircleCI] account if you don't already have one and sync it with your GitHub account.

9. Inside the project root create a folder called _.circleci_ and inside make a file called _config.yml_

10. When you sign in you will see all the repositories that are in your GitHub inside the CircleCI dashboard. Find the project you want to test and click _Set Up Project_

11. CircleCI will detect the config.yml and start building according to the workflow defined in the config file. You should see something like this

![](/images/circle2.png)

</p></details>

<details>
<summary><b>Write Dockerfiles for the Frontend and Backend</b></summary><p>

Add a Dockerfile to the root of the frontend, and the root of the backend, then configure the lines as described below.

**Line 1:** "FROM" tells Docker what base image to use as a starting point. For this project, we will use the alpine version of Node since it is lightweight.

```
  FROM node:12-alpine3.14
```

**Line 2:** Set the working directory in the container to /usr/src/app. This directory is where all our code files will be stored inside the container, as well as where we'll run npm install, and launch the application:

```
  WORKDIR /usr/src/app
```

**Lines 3:** Copy the package.json file into the current working directory inside the container, represented by "."

```
  COPY ./package.json ./
```

**Lines 4:** "RUN" executes commands inside the container. Here we use it to install all the projects dependencies which are listed in the package.json file.

```
  RUN npm install
```

**Line 5:** Copy over all the rest of the projects files and folders.

```
  COPY . .
```

**Line 6:** This line describes the command that should be executed when the Docker image is launching. The package.json files of both the frontend and backend, both already contain a start script which we call here.

```
  CMD ["npm "start"]
```

Create a file called .dockerignore. This file is similar to a .gitignore file and lets us ignore files or folders that should not be included in the final Docker build.

```
  node_modules
  .git
  .gitignore

```

Once the Dockerfiles have been created, run the following command to build the images:

To create the image for the frontend:

```
  docker build -t "react-app" .
```

To create the image for the backend:

```
  docker build -t "api-server" .
```

![](/images/reactimage.png)

![](/images/bimage2.png)

To confirm both images have been created run

```
  docker images
```

![](/images/dockerimages.png)

</p></details>

<details>
<summary><b>Use Docker Compose in Development Workflow</b></summary><p>

I am using Docker Composeas a way of managing my application during development. It usually comes bundled together with Docker so if you installed Docker, you should already have Docker Compose on your sytem. To check this you can run:

```
  docker-compose --version
```

Docker Compose, builds on top of Docker to more easily manage a multi-container application such as ours.

The following steps outline the Docker Compose file for this project..

The first line specifies which version of the Docker Compose API we want to use

```
  version: "3"
```

We now define a set of services. Our application has 3 services - the react-app clientm the api-server, and MongoDB database. Each of these services requires us to specify an image tag. We will use the images we just built which have the tags "react-app" and "api-server". Fot the database, we will pull a MongoDB image from Docker Hub. Define ports for each service.

For the react-app service, we will add the following option to keep the frontend container alive and listening for requests:

```
  stdin_open: true
```

Since the Express service needs to connect to MongoDB, we'll specify the following option to ensure the containers start in the right order:

```
  depends_on:
    mongo
```

Name the network _mern app_ which uses the default driver. It will allow the services to communicate with each other.

```
  networks:
    mern-app:
      driver: bridge
```

Lastly add a volume to enable persistence of the database data, so the data in the database will not get deleted when the app restarts.

Now run the following command to start up all 3 containers, as well as attch the network and volume resources:

```
  docker-compose up
```

Execution of _docker-compose up_

![](/images/composeup.png)

![](/images/compose.png)

Now if you go to localhost: 3000 you should be able to see the application running.

![](/images/compose2.png)

To shutdown the application run:

```
  docker-compose down
```

</p></details>

## Stage 2

| Tool      | Purpose                                                               |
| --------- | --------------------------------------------------------------------- |
| Terraform | IaC tool to provision cloud resources and application infrastructure. |
|           |                                                                       |
| Cloud Run | Serverless platform from GCP to deploy and run containers.            |
|           |                                                                       |
| Kubectl   | The command-line tool for interacting with a Kubernetes cluster.      |
|           |
|           |
|           |
|           |

<details>
<summary><b>Use Jenkins to Build and Push Docker Images To Google Container Registry</b></summary><p>

</p></details>

<details>
<summary><b>Use Terraform to Provision Google Cloud Run</b></summary><p>

### Prerequisites

- [Terraform CLI](https://www.terraform.io/downloads.html)

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)

1. Authenticate the SDK to Gcp by running:

```
  gcloud auth application-default login
```

2. Create a new project where Cloud Run will be deployed (use your own credentials):

```
  gcloud projects create "PROJECT_ID" --name="PROJECT_NAME"
```

3. Create a _main.tf_ file where we will put all our Terraform code.

4. Add the requirements for Terraform and the Google provider

```
terraform {
  required_version = ">= 0.14"

  required_providers {
    # Cloud Run support was added on 3.3.0
    google = ">= 3.3"
  }
}
```

5. Add the Google provider configuration:

```
provider "google" {
  project = "PROJECT_ID"
}
```

6. Enable the Cloud Run API:

```
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = true
}
```

7. Create the Cloud Run service:

```
resource "google_cloud_run_service" "run_service" {
  name = "app"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/google-samples/hello-app:1.0"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.run_api]
}
```

**name:** the name of your service.
**location:** the region where your service will run.
**image:** the Docker image that will be used to create the container. Make sure the images are in Google's Container Registry.
**depends_on:** waits for a resource to be ready, in this case, the Cloud Run API.

8. Allow authenticated users to use the service:

```
resource "google_cloud_run_service_iam_member" "run_all_users" {
  service  = google_cloud_run_service.run_service.name
  location = google_cloud_run_service.run_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
```

9. Display the service URL in the Terraform command output:

```
output "service_url" {
  value = google_cloud_run_service.run_service.status[0].url
}
```

Now its time to deploy the infrastructure.

10. Initialize the Terraform configuration:

```
  terraform init
```

![](/images/tinit.png)

11. Verify the changes that will be applied:

```
  terraform plan
```

![](/images/tplan1.png)

![](/images/tplan2.png)

12. Apply all the changes:

```
  terraform apply
```

![](/images/cloudrun.png)

### Updating the service

We can also use Terraform to update our Clod Run infrastructure.

When a configuration is changed or a new image is added, you can then redirect all the traffic to the new revision and start serving your updated application.

To update the service, we have to change the value of the image property and pass it a new image:

```
resource "google_cloud_run_service" "run_service" {
  name = "app"

  # ...

  template {
    spec {
      containers {
        # Change `react-app:1.0` to `react-app:2.0` 👇
        image = "gcr.io/google-samples/react-app:2.0"
      }
    }
  }

  # ...
}
```

To deploy the changes run:

```
  terraform apply
```

</p></details>

<details>
<summary><b>Build Docker Images using Jenkins</b></summary><p>

Prerequisites

- Make sure you have Java 8 or 11 installed on your system.
- Download and Install [Jenkins](https://www.jenkins.io/download/).

Create codebase.
Sync with GitHub
Sync GitHub with Jenkins

- go to folder where jenkins installed eg /downloads/Jenkins and open cmd and run:
  jenkins -jar jenkins.war
  By default should be running on port 8080. Should say jenkins is fully up and running. Go to localhost:8080 - should redirect you to jenkins dashboard

  1. Create new Job & name eg jenkins-docker. Click Freestyle project, click ok
  2. Under General, select "Github Project" and enter project url (doensnt end with .git)
  3. Under Source Code Management, choose "Git" and enter repo url (go to github ), click on "Clone or Download" and copy url under "clone with https". No nned to provide credentials because repo is public
  4. Under "Build Triggers", select "Pull SCM" and put 5 stars (**\***) in 'Schedule' section. Will get msg "Do you really mean every minute"
     We used the Poll SCM as the build trigger; setting this option instructs Jenkins to check the Git repository on a periodic basis (every minute as indicated by \* \* \* \* \*). If the repo has changed since the last poll, the job is triggered.
  5. Under "Build" ???????????????????
  6. Click apply and save
  7. In the dashboard click "build now"
  8. To verify that GitHub and Jenkins are synced, make change in your source code. Once commit has been pushed tp GH, should appear in Jenkins

  Intergrate Jenkins with Docker

  1. Add 3 docker plugins. In Jenkins dashboard, go to "Manage Jenkins". Go to "Manage Plugins." Go to "Available" and in the filter type docker. Look for plugin called "Cloudbees docker build and publish plugin," as well as the one called "docker plugin," as well as "docker build step."

  install the following plugins that will be used in our lab:

git
pipeline
CloudBees Docker Build and Publish
GitHub

2.  Create Dockerfile in project root and commit

3.  Instruct Jenkins to build docker image off of Dockerfile and post to Dockhub - in Jenkins dashboard, click on your project, click "Configure." Under "Build Environment," go to "Build" -> "Add build step" -> "Docker build and publish"

4.  Under "repository name" enter dockerhub username (deserie), then image name that was specified in Dockerfile

5.  Under "Registry credentials," provide dockerhub creds.

6.  Apply and save.

7.  In main dashboard "build now"

8.  Verify image is in dockerhub

Resources
https://www.jenkins.io/doc/book/pipeline/docker/

</p></details>

</p></details>

<details>
<summary><b>Push Docker Images to Google Container Registry</b></summary><p>

We have successfully built a Docker images react-app and api-server and now we need to push the images to Google Container Registry, so that they can be deployed from other locations, such as GKE.

Google Container Registry is a private storage service for Docker images.

First, configure the local Docker client to be able to authenticate to Container Registry

```
  export PROJECT_ID="$(gcloud config get-value project -q)"
  gcloud auth configure-docker
```

Next, tag the local Docker images for uploading:

```
  docker tag react:latest "gcr.io/${PROJECT_ID}/react-app:v1"
```

Finally, push the Docker image to the Container Registry:

```
  docker push "gcr.io/${PROJECT_ID}/react-app:v1"
```

![](/images/push1.png)

![](/images/push2.png)

For the MongoDB database container, we will pull a publicly available mongo image from Docker Hub. I used the Google Cloud Shell for this task:

```
  docker pull mongo
  docker tag mongo gcr.io/{PROJECT-ID}/mongo:latest
  docker push gcr.io/{PROJECT-ID}/mongo:latest
```

![](/images/mongopull.png)

![](/images/push3.png)

</p></details>

<details>
<summary><b>Create A GKE Autopilot Cluster</b></summary><p>

Here we create a Google Kubernetes Engine (GKE) cluster in Autopilot mode. The Autopilot mode of operation means that Google takes care of node management and infrastructure. GKE provisions, configures, and manages the resources and hardware for you.

Here we'll go through 2 different ways to create a Google Kubernetes Engine Autopilot Cluster.

**Create a GKE Autopilot Cluster Using gcloud command-line tool**

Prerequisites

1. Enable the Google Kubernetes Engine API.

2. Install the Google Cloud SDK.

3. Set up default gcloud settings using glcoud init or gcloud config.

To create the cluster, run the following command:

```
gcloud container clusters create-auto CLUSTER_NAME \
    --region REGION \
    --project=PROJECT_ID
```

![](/images/gcloud.png)

**Create a GKE Autopilot Cluster Using Google Cloud Console**

1. Go to the Google Kubernetes Engine page in the Cloud Console.

2. Go to Google Kubernetes Engine

3. Click Create.

![](/images/create1.png)

4. In the Autopilot section, click Configure.

![](/images/create2.png)

5. Enter the Name for your cluster.

![](/images/create3.png)

6. Select a region for your cluster.

7. Choose a public or private cluster.

8. Click Create.

![](/images/clusters.png)

</p></details>

<details>
<summary><b>Deploy App to Google Kubernetes Engine</b></summary><p>

Kubernetes
Until now we are only pushing Docker images to the registry, in order to run them we need to create some Kubernetes pods and services. We will have one Pod for each container, one for MongoDB, one for Node, and one for NGINX. Pods are usually declared using deployments.

https://engineering.hexacta.com/automatic-deployment-of-multiple-docker-containers-to-google-container-engine-using-travis-e5d9e191d5ad

</p></details>

<details>
<summary><b>Launch A GCP Virtual Machine from Custom Machine Image Using Terraform</b></summary><p>

To see the machine image we've just built using Packer in action, we can provision a Virtual Machine using Terraform.

In order for Terraform to be able to provision the infrastructure needed for this project, make sure to setup GCP in the following way:

1. Create a GCP Project in the console or use the project created when building the AMI.

2. Enable Google Compute Engine for your project in the GCP console.

3. Create a Service Account by going to IAM & ADMIN -> Service Accounts. Click "Create Service Account". Give it any desired name and click "Create and Continue". For the Role, choose "Owner", then click "Continue". Skip granting additional users access, and click "Done".

4. After you create your service account, you need to create a service account key. Select your service account from the list. Select the "Keys" tab. In the drop down menu, select "Manage Keys" then "Add key", "Create New Key". Leave the "Key Type" as JSON. Click "Create" to create the key and save the key file to your computer.

5. Inside your terminal, set the environment variable GOOGLE_APPLICATION_CREDENTIALS to point to the path where you saved your service account key. Refer to Google official documnetation [Authenticating as a service account](https://cloud.google.com/docs/authentication/production) for command for your specific shell. For Windows command prompt, use

```
  set GOOGLE_APPLICATION_CREDENTIALS=KEY_PATH
```

6. Create a main.tf file.

7. Run the following commands

```
  terraform init
  terraform plan
  terraform apply
```

8. To confirm the instance was created, inside the GCP console, go to "Compute Engine" and you should see your instance insce the VM Instances dasboard.

</p></details>

If you chose to configure Packer using Ansible, you first need to install it.

- [Download and Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#selecting-an-ansible-version-to-install)

- [Download and Install Ansible on Windows](https://phoenixnap.com/kb/install-ansible-on-windows)

3. Log into the Google Cloud Console and create a new project. Select your project and open it.

4. Go to*IAM and ADMIN* and create a custom service account for Packer and assign it Compute Instance Admin (v1) & Service Account User roles and save.

![](/images/serviceaccount.jpg)

4. Generate a JSON Key and download it.

5. Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to point to the path where you saved your service account key.

![](/images/setcreds.jpg)

# Key Learnings

CI/CD is an integral part of any modern environment that follows the Agile methodology.
Through pipelines, you can ensure a smooth transition of code from the version control system to the target environment (testing/staging/production/etc.) while applying all the necessary testing and quality control practices.
Through Jenkins, we were able to pull the code from the repository, build and test it using a relevant Docker image.
