FROM node:16.13.1-alpine

ENV REACTAPP=/usr/src

WORKDIR $REACTAPP

RUN apk update

COPY package.json $REACTAPP/package.json
RUN npm install

COPY . $REACTAPP
EXPOSE 3000

CMD [ "npm", "run", "dev" ]
