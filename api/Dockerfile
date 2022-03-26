# https://nodejs.org/ru/docs/guides/nodejs-docker-webapp/

FROM node:14.5.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server.js" ]