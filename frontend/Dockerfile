FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm run-script build

FROM nginx:stable-alpine

COPY --from=build /app/build /var/www
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]