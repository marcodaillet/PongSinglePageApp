FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
EXPOSE 8000

CMD ["npm", "run", "start:dev"]