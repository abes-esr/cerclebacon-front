FROM node:24.11.0 AS build-image
WORKDIR /build/
COPY ./package*.json                /build/
RUN npm ci

COPY ./*.js                         /build/
COPY ./*.json                       /build/
COPY ./index.html                   /build/index.html
COPY ./src/                         /build/src/
COPY ./public/                      /build/public/

RUN npm run build

FROM nginx:1.24.0 AS front-image
COPY --from=build-image /build/dist /usr/share/nginx/html
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

