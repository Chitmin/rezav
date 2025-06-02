<?php

namespace App\Actions;

use App\Contracts\HasEnumValues;
use Illuminate\Support\Str;
use Spatie\Permission\Contracts\Permission;

class SeedsEnumPermissions
{
    public function __invoke(?string $name = null)
    {
        return $this->seeds($name);
    }

    /**
     * Seeds a given permission enum or all enums
     *
     * @return array<string, null|string> null for success & string for error message keyed by enum name
     */
    protected function seeds(?string $name = null): array
    {
        $list = $name ? [$this->prefixNamespace($name)] : $this->getAllPermissions();
        $cl = app(Permission::class);
        $results = [];

        foreach ($list as $enum) {
            try {
                if (in_array(HasEnumValues::class, class_implements($enum))) {

                    // Has to use nested loop to avoid duplicate permissions
                    foreach ($enum::values() as $permission) {
                        $cl->findOrCreate($permission, 'web');
                    }

                    $results[$enum] = null;
                }
            } catch (\Throwable $th) {
                $results[$enum] = $th->getMessage();
            }
        }

        return $results;
    }

    /**
     * Prefix namespace to permission name.
     */
    protected function prefixNamespace(string $name): string
    {
        $dir = rtrim(config('permission.enums.directory', 'Enums/Permissions'), '/');
        $namespace = 'App\\'.Str::replace('/', '\\', $dir);

        return $namespace.'\\'.$name.'Permissions';
    }

    /**
     * Get all permissions under enums directory.
     */
    protected function getAllPermissions(): array
    {
        $getter = new GetAllEnumsPermissions;
        $permissions = [];

        foreach ($getter() as $enum) {
            $permissions[] = $enum->name;
        }

        return $permissions;
    }
}
