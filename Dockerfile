FROM node:alpine

WORKDIR /usr/weatherapp

COPY ./package.json .

RUN npm install

COPY . .
# COPY ./ ./ 

CMD ["npm","start"]