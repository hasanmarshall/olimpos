FROM node:18.1.0-alpine3.14

ENV NODE_ENV=production

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install --production

ADD bin ./bin
ADD src ./src

CMD ["npm", "start"]