# Use official PHP Apache image
FROM php:8.2-apache

# Enable Apache rewrite
RUN a2enmod rewrite

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel project
COPY . .

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Clear Laravel caches
RUN php artisan config:clear \
 && php artisan route:clear \
 && php artisan view:clear

# Set Apache document root to /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf

# Apache config to allow symlinks & access (CRITICAL)
RUN printf "<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
    Options FollowSymLinks\n\
</Directory>\n" > /etc/apache2/conf-available/laravel.conf \
 && a2enconf laravel

# Expose port
EXPOSE 80

# Start app (runtime-safe)
CMD php artisan migrate --force \
 && php artisan storage:link \
 && apache2-foreground