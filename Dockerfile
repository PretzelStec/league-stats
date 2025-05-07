FROM node:24 as base

RUN mkdir -p /microservice
WORKDIR /microservice
ADD package.json /microservice/package.json
RUN npm install

ADD . /microservice

RUN npm run build

CMD ["npm", "run", "start"]