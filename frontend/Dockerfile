FROM node:17-alpine

WORKDIR /app

COPY package.json .
RUN npm install --location=global npm@8.19.1
RUN npm install -s array-sort
# RUN npm install --location=global svgo@2.8.0
RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3001

CMD ["npm", "start"]