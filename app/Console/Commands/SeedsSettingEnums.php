<?php

namespace App\Console\Commands;

use App\Actions\GetAllEnumsSettings;
use App\Contracts\HasEnumValues;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Rawilk\Settings\Facades\Settings;

class SeedsSettingEnums extends Command
{
    public function __construct(protected GetAllEnumsSettings $getter)
    {
        parent::__construct();
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:settings {--name=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds setting enums';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->option('name');
        $list = $name ? [$this->prefixNamespace($name)] : $this->getAllSettings();

        foreach ($list as $enum) {
            try {
                if (in_array(HasEnumValues::class, class_implements($enum))) {
                    $this->info("Seeding {$enum}...");

                    foreach ($enum::list() as $key => $value) {
                        Settings::set($key, $value);
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
        $dir = rtrim(config('settings.enums.directory', 'Enums/Settings'), '/');
        $namespace = 'App\\'.Str::replace('/', '\\', $dir);

        return $namespace.'\\'.$name;
    }

    /**
     * Get all settings under enums directory.
     */
    protected function getAllSettings(): array
    {
        $settings = [];
        $getter = $this->getter;

        foreach ($getter() as $enum) {
            $settings[] = $enum->name;
        }

        return $settings;
    }
}
