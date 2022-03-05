FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${API_PORT}

CMD ["npm", "run", "start:dev"]