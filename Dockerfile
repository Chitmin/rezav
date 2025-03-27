# Stage 1: Build Base with PHP, Extensions, Composer, Supervisor, and Xdebug
ARG PHP_VERSION=8.4
FROM php:${PHP_VERSION}-fpm-alpine AS base

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
# - Core deps for extensions: build-base, autoconf for compiling
# - Libs for common PHP extensions: libzip-dev, icu-dev, libpng-dev, libjpeg-turbo-dev, freetype-dev, libxml2-dev, oniguruma-dev, postgresql-dev (for pgsql)
# - Other tools: supervisor, git, curl, unzip
RUN apk add --no-cache --update \
    linux-headers \
    supervisor \
    git \
    curl \
    unzip \
    libzip-dev \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libxml2-dev \
    oniguruma-dev \
    postgresql-dev \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    # Install Core PHP Extensions needed by Laravel
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    bcmath \
    pcntl \
    pdo pdo_pgsql \
    gd \
    zip \
    intl \
    opcache \
    exif \
    mbstring \
    xml \
    # Install Xdebug via PECL
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    # Clean up build dependencies
    && apk del .build-deps

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure PHP (adjust upload limits, timezone, etc. as needed)
COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/app-php.ini
# Configure Xdebug
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
# Configure PHP-FPM pool (optional, but ensures user/group and listen address)
COPY ./docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Configure Supervisor (only for PHP-FPM and optional workers)
COPY ./docker/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./docker/supervisor/php-fpm.conf /etc/supervisor/conf.d/php-fpm.conf
# Add queue worker config if needed
COPY ./docker/supervisor/queue-worker.conf /etc/supervisor/conf.d/queue-worker.conf

# Copy composer files and install dependencies (cache layer)
COPY --chown=www-data:www-data composer.json composer.lock ./
# Consider running composer as www-data if permissions become an issue
# USER www-data
RUN composer install --no-scripts --no-autoloader --no-interaction --prefer-dist
# USER root

# Copy application code
COPY --chown=www-data:www-data . .

# Run composer install again to run scripts and generate autoloader
# Set permissions for Laravel storage and bootstrap cache
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    # Optional: Generate Laravel specific caches/configs if needed during build
    # && php artisan optimize:clear \
    # && php artisan config:cache \
    # && php artisan route:cache \
    # && php artisan view:cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Expose port 9000 for PHP-FPM (Nginx will connect to this)
EXPOSE 9000

# Start Supervisor (which will start php-fpm)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
