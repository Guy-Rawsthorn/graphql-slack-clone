FROM node:11

WORKDIR /server

COPY package*.json ./

RUN npm install --slient

COPY . .

expose 8000

CMD [ "npm", "start"]