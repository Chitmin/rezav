<?php

namespace App\Console\Commands;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Spatie\Permission\Contracts\Role;

class CreateSuperAdmin extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-super-admin {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a super admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::where('email', $this->argument('email'))->first();

        if ($user) {
            $this->error('User already exists');

            return;
        }

        $email = $this->argument('email');
        $password = $this->argument('password');
        $user = User::create([
            'name' => 'Super Admin',
            'email' => $email,
            'password' => bcrypt($password),
        ]);

        $role = app(Role::class)->findOrCreate(RolesEnum::SUPERADMIN->value, 'web');
        $user->assignRole($role);

        $this->info('Super admin created successfully');
    }

    /**
     * Prompt for missing input arguments using the returned questions.
     *
     * @return array<string, string>
     */
    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'email' => 'Email for the super admin?',
            'password' => 'Password for the super admin?',
        ];
    }
}
