FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build-prod

CMD npm run serverdovk
