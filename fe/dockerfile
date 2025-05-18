FROM php:8.2-apache

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    zip \
    unzip

WORKDIR /var/www/html

COPY . /var/www/app

COPY public .

RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R g+w /var/www/html/

EXPOSE 80
