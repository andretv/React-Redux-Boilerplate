FROM node:10

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

EXPOSE 1234
CMD ["npm", "run", "dev"]