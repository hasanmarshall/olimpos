FROM node:18.1.0-alpine3.14

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD .browserslistrc .prettierrc .eslintrc.js babel.config.js jsconfig.json lint-staged.config.js vue.config.js ./

CMD ["npm", "run", "serve"]