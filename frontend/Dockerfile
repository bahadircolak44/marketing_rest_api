FROM nginx:1.18

VOLUME /var/www
COPY ./build /var/www
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]