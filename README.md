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
docker compose exec app php artisan db:seed --class=RoleSeeder
```

Create Super Admin.

```
docker compose exec app php artisan app:create-super-admin
```

## Roles

- Add the new role in `app/Enums/RolesEnum.php`.
- Run the seeder.

```
docker compose exec app php artisan db:seed --class=RoleSeeder
```

## Permissions

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

## Run dev server.

```
pnpm dev
```
