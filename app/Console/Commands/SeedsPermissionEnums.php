<?php

namespace App\Console\Commands;

use App\Actions\GetAllEnumsPermissions;
use App\Contracts\HasEnumValues;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Spatie\Permission\Contracts\Permission;

class SeedsPermissionEnums extends Command
{
    public function __construct(protected GetAllEnumsPermissions $getAllEnumsPermissions)
    {
        parent::__construct();
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:permission {--name=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds permission enums.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->option('name');
        $list = $name ? [$this->prefixNamespace($name)] : $this->getAllPermissions();
        $cl = app(Permission::class);

        foreach ($list as $enum) {
            try {
                if (in_array(HasEnumValues::class, class_implements($enum))) {
                    $this->info("Seeding {$enum}...");

                    // Has to use nested loop to avoid duplicate permissions
                    foreach ($enum::values() as $permission) {
                        $cl->findOrCreate($permission, 'web');
                    }

                    $this->info("Seeding {$enum} done.");
                }
            } catch (\Throwable $th) {
                $this->error("Seeding {$enum} failed: {$th->getMessage()}");
            }
        }
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
        $permissions = [];
        $getter = $this->getAllEnumsPermissions;

        foreach ($getter() as $enum) {
            $permissions[] = $enum->name;
        }

        return $permissions;
    }
}
