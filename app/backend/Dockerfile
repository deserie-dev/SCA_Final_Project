FROM node:alpine3.14
# sets working directory. All commands will be run in here
WORKDIR /usr/src/app
# copy package into current directory, which is /backend
COPY ./package.json ./
# install dependencies
RUN npm install
#take evry single file inside directory, src code & all, and put inside /backend
COPY . .
# node is listening on 3000
EXPOSE 5000
# tell container what command to run
CMD ["npm "start"]

# docker caches result of each layer. each command is like a layer
# if rebuild docker image will take less time.
# docker build -t api-server
# docker image ls
# docker run -v pathtofolderonlocalmachine:pathtofolderoncontainer -p 3000:3000 --name api(will be name of container) api-server(image we created)
# -v flag for syncing source code with bind mounts so automatically updates when you change your code so will be -v %cd%:/backend
# to go inside container run docker exec -it containername bash. Should  open bash shell inside container, inside the working dir, /backend, so if ls, will see all files that were copied over
# need npm install nodemon --save-dev into project

#docker run -v $cd%:/backend:ro -v /backend/node_modules -p 3000:3000 -d --name containername imagename

# -v /backend/node_modules creates an anonymous volume to make sure the bind mount (-v $cd%:/backend) doen't override/delete the node_modules inside the /backend on the container so the bind mount can sync all other folders but will not touch the node_modules inside the container. The bind mount is just used during the development process.
# no bind mount in production because dont change code on prod
# the :ro makes sure the bind mount is read-only so if make changes on the container, they wil, not show on your local machine