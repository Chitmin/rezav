ARG PHP_VERSION=8.4

# --- Stage 1: Composer Dependencies ---
FROM composer:latest AS composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

# --- Stage 2: Node.js Dependencies and Assets Build ---
FROM node:lts-alpine AS node

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g corepack \
    && corepack enable \
    && corepack prepare pnpm@latest --activate \
    && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# --- Stage 3: Main Image ---
FROM php:${PHP_VERSION}-fpm-alpine AS app

# Install system dependencies
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
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && pecl install redis \
    && docker-php-ext-enable redis.so \
    # Clean up build dependencies
    && apk del .build-deps

# Copy application code
WORKDIR /var/www/html
COPY --from=composer /app/vendor ./vendor
COPY --from=node /app/public ./public
COPY --from=node /app/bootstrap ./bootstrap
COPY --from=node /app/config ./config
COPY --from=node /app/.env ./.env
COPY --from=node /app/app ./app
COPY --from=node /app/database ./database
COPY --from=node /app/routes ./routes
COPY --from=node /app/storage ./storage
COPY --from=node /app/artisan ./artisan
COPY --from=node /app/package.json ./package.json
COPY --from=node /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=node /app/resources ./resources
COPY --from=node /app/docker ./docker
COPY --from=node /app/Dockerfile ./Dockerfile
COPY --from=node /app/docker-compose.yml ./docker-compose.yml

COPY ./docker/php/php.ini /usr/local/etc/php/conf.d/app-php.ini
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
COPY ./docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Configure Supervisor, PHP-FPM and workers
COPY ./docker/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./docker/supervisor/php-fpm.conf /etc/supervisor/conf.d/php-fpm.conf
COPY ./docker/supervisor/queue-worker.conf /etc/supervisor/conf.d/queue-worker.conf

# Set permissions for Laravel storage and bootstrap cache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

WORKDIR /var/www/html
USER www-data

EXPOSE 9000
EXPOSE 9003

# Start Supervisor (which will start php-fpm)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
