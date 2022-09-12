FROM node:17-alpine

WORKDIR /app

COPY package.json .
RUN npm install --location=global npm@8.19.1
RUN npm install -s array-sort
RUN npm install @nestjs/cli --location=global
RUN npm install
COPY . .

EXPOSE 3000
EXPOSE 8000

CMD ["npm", "run", "start:dev"]