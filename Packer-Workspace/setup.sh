#!/bin/bash

sudo apt-get update

# install Node.js for backend

echo "Installing NODE"

# In this command, replace 15 with the major version number
# of Node.js that is installed on your computer locally
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -

sudo apt-get install -y nodejs 

# install Node.js for backend

echo "Installing NODE"

sudo npm install pm2 -g 

echo "Installing NGINX"

sudo apt install nginx 

# installing MongoDB for database

echo "Installing MongoDB"

wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

sudo apt-get install -y mongodb-org 

# install GIT for version control

echo "Installing GIT"

sudo apt -y install git 