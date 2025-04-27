## Setup

Run docker compose.

```
docker compose up -d
```

Migrate database.

```
docker compose exec app php artisan migrate
```

Seeds roles.

```
docker compose exec app php artisan db:seed --class=RolesSeeder
```

Create Super Admin.

```
docker compose exec app php artisan app:create-super-admin
```

## Add a new role

- Add the new role in `app/Enums/RolesEnum.php`.
- Run the seeder.

```
docker compose exec app php artisan db:seed --class=RolesSeeder
```

## Add new permissions

- Make a permission enum first. For example, Room.

```
docker compose exec app php artisan make:permission-enum Room
```

- Update the permissions set of the generated Permission enum.
- And seeds the updated enum.

```
docker compose exec app php artisan db:permission --name=Room
```

If you want to re-seed all the permissions, you can run the command without `--name`.
You might want to use the permissions with **[Laravel's Policy](https://laravel.com/docs/12.x/authorization#creating-policies)** because the underlying the authorization package is **[spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction)**.

**IMPORTANT**: After you have added a new role or permission, you need to run the command below to update/generate the type definitions.

```
docker compose exec app php artisan typescript:transform --format
```

## Run dev server.

```
pnpm dev
```
