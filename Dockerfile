FROM node:12.4.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./build ./build

EXPOSE 1212

CMD ["npm", "start"]