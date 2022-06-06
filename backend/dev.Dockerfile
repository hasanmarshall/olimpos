FROM node:18.1.0-alpine3.14

RUN npm install -g nodemon

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin 

CMD ["nodemon"]