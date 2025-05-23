<?php

namespace App\Console\Commands;

use App\Traits\FileContentReplacer;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakePermissionEnum extends Command implements PromptsForMissingInput
{
    use FileContentReplacer;

    /**
     * Filesystem instance
     *
     * @var Filesystem
     */
    protected $fs;

    /**
     * Create a new command instance.
     */
    public function __construct(Filesystem $fs)
    {
        parent::__construct();

        $this->fs = $fs;
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:permission-enum {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a permission enum';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $enumDir = rtrim(config('permission.enums.directory', 'Enums/Permissions'), '/');
        $name = Str::studly(Str::singular($this->argument('name')));
        $file = app_path("{$enumDir}/{$name}Permissions.php");

        if ($this->fs->exists($file)) {
            $this->error('Permission enum already exists!');

            return self::FAILURE;
        }

        $this->fs->ensureDirectoryExists(dirname($file));
        $this->fs->put($file, $this->replaceInFile($this->getStubPath(), [
            '#NAMESPACE' => Str::replace('/', '\\', $enumDir),
            '#NAME' => $name.'Permissions',
            '#RESOURCE' => Str::slug(Str::singular($name)),
        ]));

        $this->info('Permission enum created successfully.');

        return self::SUCCESS;
    }

    /**
     * Return the stub file path
     *
     * @return string
     */
    public function getStubPath()
    {
        return __DIR__.'/../../../stubs/permission-enum.stub';
    }

    /**
     * Prompt for missing input arguments using the returned questions.
     *
     * @return array<string, string>
     */
    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'name' => 'What is the name of the permission?',
        ];
    }
}
