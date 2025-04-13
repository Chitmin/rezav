## Run

Run docker compose

```
docker compose up -d
```

Migrate database

```
docker compose exec app php artisan migrate
```

Run dev server

```
pnpm dev
```

## Setup

Seeds roles

```
docker compose exec app php artisan db:seed --class=RoleSeeder
```

Create Super Admin

```
docker compose exec app php artisan app:create-super-admin
```
