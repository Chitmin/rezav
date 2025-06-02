<?php

namespace App\Console\Commands;

use App\Actions\SeedsEnumPermissions;
use Illuminate\Console\Command;

class SeedsPermissionEnums extends Command
{
    public function __construct(protected SeedsEnumPermissions $action)
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
        $action = $this->action;
        $result = $action($this->option('name'));

        foreach ($result as $enum => $error) {
            $error
                ? $this->error("Seeding {$enum} failed: {$error}")
                : $this->info("Seeding {$enum} done.");
        }
    }
}
