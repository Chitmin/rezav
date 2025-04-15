<?php

namespace App\Actions;

use App\Contracts\HasEnumValues;
use App\Dtos\EnumPermission;
use Generator;
use Illuminate\Support\Str;

class GetAllEnumsPermissions
{
    /**
     * Get all enums permissions.
     *
     * @return Generator<EnumPermission>
     */
    public function __invoke(): Generator
    {
        $dir = rtrim(config('permission.enums.directory', 'Enums/Permissions'), '/');
        $path = app_path($dir);
        $namespace = 'App\\'.Str::replace('/', '\\', $dir);
        foreach (glob("{$path}/*Permissions.php") as $file) {
            $name = basename($file, '.php');
            $label = Str::of(basename($file, 'Permissions.php'))
                ->snake()
                ->title()
                ->replace('_', ' ')
                ->value;
            $permission = $namespace.'\\'.$name;

            if (! class_exists($permission) || ! in_array(HasEnumValues::class, class_implements($permission))) {
                continue;
            }

            yield EnumPermission::make($permission, $label, $permission::values());
        }
    }
}
