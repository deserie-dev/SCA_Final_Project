# She Code Africa Final Project

👇 **_Live Project Deployed On Google Cloud Platform_** 👇

[Around The World](https://deserie.students.nomoreparties.site/)

## Overview

Around The US is a photo sharing web application. Once registered using an email address and password, users can login and edit their profile information, profile picture, and can upload pictures from the web.

This project began as one of the projects I did in my FullStack Developer Bootcamp with YPracticum.

## Technologies Used

**Frontend -** React

**Backend -** Node.js.

**Authentication -** JSON Web Tokens

**Database -** MongoDB

**Reverse-Proxy server** - NGINX

**SSL Certificate -** Let's Encrypt

**Containerization -** Docker

**Infrastructure-as-Code -** Terraform

**CI/CD -** CircleCI

## In-depth

<details>
<summary><b>Prerequisites</b></summary><p>
A Google Cloud Platform account. This project is built using services in the free tier.

</p></details>

<details>
<summary><b>Building A Custom Machine Image Using Packer</b></summary><p>

1. Download and install Packer.

2. Log into the Google Cloud Console and create a new project. Select your project and open it.

3. Create a custom service account for Packer and assign it Compute Instance Admin (v1) & Service Account User roles and save.

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
<summary><b>Launching A GCP Virtual Machine from AMI Image Using Terraform</b></summary><p>

In order for Terraform to be able to provision the infrastructure needed for this project, first setup GCP in the following way:

1. Create a GCP Project: GCP organizes resources into projects. Create one now in the GCP console and make note of the project ID. You can see a list of your projects in the cloud resource manager.

Google Compute Engine: Enable Google Compute Engine for your project in the GCP console. Make sure to select the project you are using to follow this tutorial and click the "Enable" button.

A GCP service account key: Create a service account key to enable Terraform to access your GCP account. When creating the key, use the following settings:

Select the project you created in the previous step.
Click "Create Service Account".
Give it any name you like and click "Create".
For the Role, choose "Project -> Editor", then click "Continue".
Skip granting additional users access, and click "Done".
After you create your service account, download your service account key.

Select your service account from the list.
Select the "Keys" tab.
In the drop down menu, select "Create new key".
Leave the "Key Type" as JSON.
Click "Create" to create the key and save the key file to your system.

</p></details>

<details>
<summary><b>Containerize Your Application Using Docker</b></summary><p>

</p></details>

<details>
<summary><b>Configuration Management Using Ansible</b></summary><p>

</p></details>

<details>
<summary><b>CI/CD Using CircleCI</b></summary><p>

</p></details>

## Key Learnings
