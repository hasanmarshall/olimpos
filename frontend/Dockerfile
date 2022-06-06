FROM node:18.1.0-alpine3.14 AS BUILDER

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD .browserslistrc .prettierrc .eslintrc.js babel.config.js jsconfig.json lint-staged.config.js vue.config.js ./

ADD src ./src
ADD public ./public

RUN npm run build

FROM node:18.1.0-alpine3.14

WORKDIR /app

RUN npm i -g serve

COPY --from=BUILDER /app/dist ./

CMD serve -s -l $PORT