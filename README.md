# She Code Africa Final Project

## A Brief Overview of the Application

Around The US is a photo sharing web application. Once registered using an email address and password, users can login and edit their profile information, profile picture, and can upload pictures from the web.

This project began as one of the projects I did in my FullStack Developer Bootcamp with YPracticum.

## Technologies Used

**Frontend -** React

**Backend -** Node.js.

**Authentication -** JSON Web Tokens

**Database -** MongoDB

**Reverse-Proxy server** - NGINX

**SSL Certificate -** Let's Encrypt

## Running the Project Locally

Navigate to the frontend directory and run the following commands which will install the project's dependencies and start the app in the development mode:

```
npm install
npm start
```

Open http://localhost:3000 to view it in the browser. You will see the following login screen:

![](/images/login.png)

## In-depth

<details>
<summary><b>Build A Custom Machine Image Using Packer</b></summary><p>

1. [Download and install Packer](https://www.packer.io/downloads)
2. Packer has many different provisioners including Chef and Puppet. For this project, I have provided two different Packer templates - one using the using the [Windows Shell Provisioner](https://www.packer.io/docs/provisioners/windows-shell), and one using the [Ansible Provisioner](https://www.packer.io/docs/provisioners/ansible/ansible).

Both the provided ansible playbook and Bash script do the same thing - install software like Nodejs and MongoDB onto our custom machine image that our application needs to run. You can find both templates inside the packer directory.

If you chose to configure Packer using Ansible, you first need to install it.

- [Download and Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#selecting-an-ansible-version-to-install)

- [Download and Install Ansible on Windows](https://phoenixnap.com/kb/install-ansible-on-windows)

3. Log into the Google Cloud Console and create a new project. Select your project and open it.

4. Create a custom service account for Packer and assign it Compute Instance Admin (v1) & Service Account User roles and save.

![](/images/serviceaccount.png)

4. Generate a JSON Key and download it.

5. Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to point to the path where you saved your service account key.

![](/images/setcreds.png)

6. Create a packer template using JSON or HCL.

7. Validate your template by running

```
  packer validate packer.json
```

8. Build the image

```
  packer build packer.json
```

![](/images/terminalimage.png)

9. To check that your image has been successully built, you can try to create a virtual machine using the image

![](/images/consoleimage.png)

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

8. To confirm the instane was created, inside the GCP console, go to "Compute Engine" and you should see your instance insce the VM Instances dasboard.

</p></details>

<details>
<summary><b>Write Dockerfiles for the Frontend and Backend</b></summary><p>

Add a Dockerfile to the directory to the root of the frontend, and the root of the backend, then configure the lines as described below.

**Line 1:** "FROM" tells Docker what base image to use as a starting point. For this project, we will use the alpine version of Node since it is lightweight.

```
  FROM node:12-alpine3.14
```

**Line 2:** Set the working directory in the container to /frontend or /backend. This directory is where all our code files will be stored inside the container, as well as where we'll run npm install, and launch the application:

```
  WORKDIR /frontend
```

**Lines 3:** Copy the package.json file into the /frontend or /backend directory in the container.

```
  COPY package.json /frontend
```

**Lines 4:** "RUN" executes commands inside the container. Here we use it to install all the projects dependencies which are listed in the package.json file.

```
  RUN npm install
```

**Line 5:** Copy over all the rest of the projects files and folders into /frontend or /backend folders inside the container.

```
  COPY . /app
```

**Line 6:** This line describes the command that should be executed when the Docker image is launching. The package.json files of both the frontend and backend, both already contain a start script which we call here.

```
  CMD npm run start
```

**Line 7:** Expose port 8081 to the outside once the container has launched.

```
  EXPOSE 8081
```

The finished Dockerfile for the frontend should look like this:

The finished Dockerfile for the backend should look like this:

Create a file called .dockerignore. This file is similar to a .gitignore file and lets us ignore files or folders that should not be included in the final Docker build.

```
  node_modules
  .git
  .gitignore

```

</p></details>

<details>
<summary><b>Build Docker Images using Jenkins</b></summary><p>

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
  5. Under "Build" ???????????????????
  6. Click apply and save
  7. In the dashboard click "build now"
  8. To verify that GitHub and Jenkins are synced, make change in your source code. Once commit has been pushed tp GH, should appear in Jenkins

  Intergrate Jenkins with Docker

  1. Add 3 docker plugins. In Jenkins dashboard, go to "Manage Jenkins". Go to "Manage Plugins." Go to "Available" and in the filter type docker. Look for plugin called "Cloudbees docker build and publish plugin," as well as the one called "docker plugin," as well as "docker build step."
  2. Create Dockerfile in project root and commit
  3. Instruct Jenkins to build docker image off of Dockerfile and post to Dockhub - in Jenkins dashboard, click on your project, click "Configure." Under "Build Environment," go to "Build" -> "Add build step" -> "Docker build and publish"
  4. Under "repository name" enter dockerhub username (deserie), then image name that was specified in Dockerfile
  5. Under "Registry credentials," provide dockerhub creds.
  6. Apply and save.
  7. In main dashboard "build now"
  8. Verify image is in dockerhub

  Resources
  https://www.jenkins.io/doc/book/pipeline/docker/

</p></details>

<details>
<summary><b>Deploy the Dockerized application to the server</b></summary><p>

SSH into the server and launch the Docker images by running docker pull and docker run.

</p></details>

<details>
<summary><b>CI/CD Using CircleCI</b></summary><p>

</p></details>

## Key Learnings
