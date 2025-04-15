<?php

use App\Actions\GetAllEnumsPermissions;
use App\Enums\RolesEnum;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery\MockInterface;

use function App\Supports\array_to_generator;

pest()->use(RefreshDatabase::class);

beforeEach(function () {
    // Create test roles
    $this->roles = Role::factory()
        ->count(2)
        ->sequence(
            ['name' => 'editor'],
            ['name' => 'viewer'],
        )
        ->create();

    // Create test permissions
    $this->permissions = Permission::factory()->count(5)->create();
});

it('shows access control page with roles and permissions', function () {
    // Mock the GetAllEnumsPermissions action
    $this->mock(GetAllEnumsPermissions::class, function (MockInterface $m) {
        $m->shouldReceive('__invoke')
            ->andReturn(array_to_generator([
                [
                    'name' => 'TestPermissions',
                    'label' => 'Test',
                    'permissions' => $this->permissions->pluck('name')->toArray(),
                ],
            ]));
    });

    // Act
    $response = $this->asSuperAdmin()->get(route('access-control'));

    // Assert
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('access-control')
        ->has('roles', 2)
        ->has('permissions', 1)
    );
});

it('updates role permissions', function () {
    // Arrange
    $role = $this->roles->first();
    $permissions = $this->permissions->pluck('name')->toArray();

    // Act
    $response = $this->asSuperAdmin()->put(route('access-control.update'), [
        'roles' => [
            $role->name => $permissions,
        ],
    ]);

    // Assert
    $response->assertRedirect(route('access-control'))
        ->assertSessionHas('success', 'Access Control updated');

    $this->assertDatabaseHas('role_has_permissions', [
        'role_id' => $role->id,
        'permission_id' => $this->permissions->first()->id,
    ]);
});

it('does not update superadmin role permissions', function () {
    // Arrange
    $req = $this->asSuperAdmin(); // super admin is seeded by this
    $superadmin = Role::where('name', RolesEnum::SUPERADMIN->value)->first();
    $permissions = $this->permissions->pluck('name')->toArray();

    // Act
    $response = $req->put(route('access-control.update'), [
        'roles' => [
            $superadmin->name => $permissions,
        ],
    ]);

    // Assert
    $response->assertRedirect(route('access-control'))
        ->assertSessionHas('success', 'Access Control updated');

    $this->assertDatabaseMissing('role_has_permissions', [
        'role_id' => $superadmin->id,
        'permission_id' => $this->permissions->first()->id,
    ]);
});

it('validates roles array structure', function () {
    // Act
    $response = $this->asSuperAdmin()->put(route('access-control.update'), [
        'roles' => 'invalid',
    ]);

    // Assert
    $response->assertSessionHasErrors('roles');
});
