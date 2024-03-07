FROM node:16

WORKDIR /app

COPY package.json .
RUN npm install

COPY src .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000