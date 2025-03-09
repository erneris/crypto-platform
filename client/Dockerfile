FROM node:20.14.0-alpine3.20 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.0-alpine3.19 as nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm /usr/share/nginx/html/* -rf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
