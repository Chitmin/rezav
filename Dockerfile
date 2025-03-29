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
    nodejs \
    npm \
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
    && pecl install redis \
    && docker-php-ext-enable redis.so \
    # Clean up build dependencies
    && apk del .build-deps

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/app-php.ini
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
COPY ./docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Configure Supervisor, PHP-FPM and workers
COPY ./docker/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./docker/supervisor/php-fpm.conf /etc/supervisor/conf.d/php-fpm.conf
COPY ./docker/supervisor/queue-worker.conf /etc/supervisor/conf.d/queue-worker.conf

# -- PHP Dependencies --
# Copy composer files and install dependencies (cache layer)
COPY --chown=www-data:www-data composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-interaction --prefer-dist


# -- Node.js Dependencies --
# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./
# Install npm dependencies (cache layer)
RUN npm install

# -- Application Code --
COPY --chown=www-data:www-data . .

# -- Final Build Steps --
# Run composer install again to run scripts and generate autoloader
# Set permissions for Laravel storage and bootstrap cache
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && npm run build \
    && php artisan optimize:clear \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

WORKDIR /var/www/html
USER www-data

EXPOSE 9000
EXPOSE 9003

# Start Supervisor (which will start php-fpm)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
