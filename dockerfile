FROM php:8.2-apache

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    zip \
    unzip

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
# Install PHP dependencies
WORKDIR /var/www/html
COPY composer.json composer.lock* .
RUN composer install --no-interaction --optimize-autoloader

COPY . /var/www/app

COPY public .

RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R g+w /var/www/html/

EXPOSE 80
