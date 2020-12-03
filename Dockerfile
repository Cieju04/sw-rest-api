FROM node:14

WORKDIR /home/node/app

ENV PORT 80

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["npm", "run", "prod"]