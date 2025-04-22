FROM php:8.2-fpm AS php-fpm

WORKDIR /var/www/html

# Copy your PHP application code
COPY . /var/www/html

FROM nginx:latest

# Copy the application code from the PHP-FPM stage
COPY --from=php-fpm /var/www/html /var/www/html

# Copy your Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the working directory for Nginx
WORKDIR /var/www/html

# Expose port 80
EXPOSE 80

# Start both Nginx and PHP-FPM
CMD ["sh", "-c", "php-fpm && nginx -g 'daemon off;'"]
