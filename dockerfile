FROM php:8.2-apache
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
# Install PHP dependencies
WORKDIR /var/www/html
COPY composer.json composer.lock* .
RUN composer install --no-interaction --optimize-autoloader

COPY . .
EXPOSE 80
