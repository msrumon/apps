FROM node:lts-alpine

WORKDIR /app

COPY ../42-intermediate-currencyconverter-1042/package*.json ./
RUN npm install

COPY ../42-intermediate-currencyconverter-1042/tsconfig.json ./
COPY ../42-intermediate-currencyconverter-1042/public ./public
COPY ../42-intermediate-currencyconverter-1042/postcss.config.js ./
COPY ../42-intermediate-currencyconverter-1042/tailwind.config.js ./
COPY ../42-intermediate-currencyconverter-1042/index.html ./
COPY ../42-intermediate-currencyconverter-1042/src ./src

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview", "--", "--host" ]
