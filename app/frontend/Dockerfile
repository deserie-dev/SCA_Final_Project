FROM node:alpine3.14

WORKDIR /usr/src/app

COPY ./package.json ./
COPY .yarn install

COPY ..

EXPOSE 3000

CMD ["yarn", "start"]