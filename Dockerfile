FROM node:9.4.0-slim

WORKDIR /app

COPY package.json ./

RUN yarn install

# Bundle app source
COPY . /app

CMD [ "npm", "start" ]
