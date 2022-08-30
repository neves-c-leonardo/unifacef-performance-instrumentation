FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./app2/*.js ./

CMD [ "node", "index.js" ]