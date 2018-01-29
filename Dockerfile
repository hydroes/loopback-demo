FROM node:9.4.0-slim

WORKDIR /app

COPY package.json ./

RUN yarn install

# Bundle app source
COPY . /app

EXPOSE 3000

ENV NODE_ENV=develop

CMD [ "npm", "start" ]
