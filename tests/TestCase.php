<?php

namespace Tests;

use App\Actions\SeedsEnumPermissions;
use App\Enums\RolesEnum;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    public function asSuperAdmin(?User $user = null)
    {
        $role = Role::factory()->create(['name' => RolesEnum::SUPERADMIN->value, 'guard_name' => 'web']);
        $user = $user ?? User::factory()->create();
        $user->assignRole($role);

        return $this->actingAs($user);
    }

    public function seedsAllEnumPermissions()
    {
        $seeder = new SeedsEnumPermissions;
        $seeder();
    }
}
