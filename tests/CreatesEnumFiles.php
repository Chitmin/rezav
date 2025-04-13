<?php

namespace Tests;

use App\Contracts\EnumValues;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;

trait CreatesEnumFiles
{
    protected Filesystem $fs;

    protected string $enumBasePath;

    protected string $enumRelativePath = 'Enums/Permissions/Test';

    public function setupEnumDirectory(): void
    {
        $this->fs = new Filesystem;
        $this->enumBasePath = app_path($this->enumRelativePath);

        // Set the config value for the test
        Config::set('permission.enums.directory', $this->enumRelativePath);

        // Ensure the directory exists and is empty
        $this->fs->ensureDirectoryExists($this->enumBasePath);
        $this->fs->cleanDirectory($this->enumBasePath);
    }

    public function teardownEnumDirectory(): void
    {
        if (isset($this->fs) && $this->fs->isDirectory($this->enumBasePath)) {
            $this->fs->deleteDirectory($this->enumBasePath);
        }
        // Reset config
        Config::set('permission.enums.directory', 'Enums/Permissions');
    }

    protected function createDummyEnum(string $name, array $permissions, bool $implementContract = true): string
    {
        $studlyName = Str::studly($name);
        $className = "{$studlyName}Permissions";
        $namespace = 'App\\'.Str::replace('/', '\\', $this->enumRelativePath);
        $filePath = "{$this->enumBasePath}/{$className}.php";

        $implementClause = $implementContract ? 'implements \\'.EnumValues::class : '';
        $cases = '';
        $valuesString = '';

        if ($implementContract) {
            foreach ($permissions as $permission) {
                $caseName = Str::studly(str_replace('.', '_', $permission));
                $cases .= "    case {$caseName} = '{$permission}';\n";
            }
            $valuesString = <<<'PHP'

                public static function values(): array
                {
                    return array_column(self::cases(), 'value');
                }

                public static function all(): array { return self::values(); }
                public static function names(): array { return array_column(self::cases(), 'name'); }
                public static function keys(): array { return self::names(); }
                public static function options($reverse = false): array { /* Omitted for test */ return []; }
            PHP;
        } else {
            // Create a simple enum without the contract methods if not implementing
            foreach ($permissions as $permission) {
                $caseName = Str::studly(str_replace('.', '_', $permission));
                $cases .= "    case {$caseName} = '{$permission}';\n";
            }
        }

        $content = <<<PHP
        <?php

        namespace {$namespace};

        use App\Contracts\EnumValues;

        enum {$className}: string {$implementClause}
        {
        {$cases}
        {$valuesString}
        }
        PHP;

        $this->fs->ensureDirectoryExists(dirname($filePath));
        $this->fs->put($filePath, $content);

        // Attempt to include the file to make it available for reflection/class_implements
        // Note: This might not always work depending on autoloading execution order in tests.
        // The command itself relies on standard autoloading which should work.
        try {
            include_once $filePath;
        } catch (\Throwable $e) {
            // Ignore potential errors during test setup include
        }

        return $namespace.'\\'.$className;
    }
}
