FROM node:16.13.1-alpine

ENV SOCKETAPP=/usr/src
WORKDIR $SOCKETAPP

RUN apk update

COPY package.json $SOCKETAPP/package.json
RUN npm install

COPY . $SOCKETAPP
EXPOSE 3001

CMD [ "npm", "start" ]