FROM node:12
RUN npm install express
WORKDIR /var/www
COPY ./build build/
COPY ./server server/
COPY ./config/paths.js config/paths.js
EXPOSE 3000
CMD node server/index.js
