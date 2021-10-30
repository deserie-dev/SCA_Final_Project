# She Code Africa Final Project

# The Application

Live Site deployed onto Google Cloud Platform:

[https://deserie.students.nomoreparties.site/signin](https://deserie.students.nomoreparties.site/signin)

[https://api.deserie.students.nomoreparties.site/signin](https://api.deserie.students.nomoreparties.site/signin)

This is a 3-tier application with a frontend, API and database. Inside the app/ directory are seperate folders for the app's React based frontend, and Node, Express based backend.

![](/images/mern.png)

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

---

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

8. Click Create.

![](/images/clusters.png)

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
<summary><b>Deploy Application to Google Cloud Run</b></summary><p>

It's now time to deploy our application onto Cloud Run. Since Cloud Run is serverless, we don't have to worry about any of the the underlying infrastructure, so getting our app deployed is pretty simple. Select the container image you want to deploy. Setup continuous deployment using Cloud Build and choose a source repository.

![](/images/deploy1.png)

### Accessing the Deployed Applcation

We should be able to access our app through the endpoint generated by Cloud Run. To get its address, inside the Console, select Cloud Run from the menu, click on the name of the deployed service, in our case _react-app_, and copy the URL provided. Paste it into your browser and you should be able to access the app.

![](/images/deploy2.png)

![](/images/deploy3.png)

</p></details>
