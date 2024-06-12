FROM node:lts-alpine

WORKDIR /app

COPY ../1-beginner-bin2dec-1001/package*.json ./
RUN npm install

COPY ../1-beginner-bin2dec-1001/tsconfig.json ./
COPY ../1-beginner-bin2dec-1001/public ./public
COPY ../1-beginner-bin2dec-1001/postcss.config.js ./
COPY ../1-beginner-bin2dec-1001/tailwind.config.js ./
COPY ../1-beginner-bin2dec-1001/index.html ./
COPY ../1-beginner-bin2dec-1001/src ./src

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview", "--", "--host" ]
