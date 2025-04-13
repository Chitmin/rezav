<?php

namespace Tests\Feature\Console;

use Spatie\Permission\Models\Permission;
use Tests\CreatesEnumFiles;

pest()->group('console');
pest()->use(CreatesEnumFiles::class);

beforeEach(function () {
    // Setup the temporary directory for enums before each test
    $this->setupEnumDirectory();
});

afterEach(function () {
    // Clean up the temporary directory after each test
    $this->teardownEnumDirectory();
});

it('seeds all permissions from enums implementing EnumValues contract', function () {
    $enum1Name = $this->createDummyEnum('Post', ['post.view', 'post.create']);
    $enum2Name = $this->createDummyEnum('User', ['user.edit', 'user.delete']);
    // Create an enum that doesn't implement the contract, it should be ignored
    $this->createDummyEnum('Comment', ['comment.approve'], false);
    // Create an enum that implements the contract but has no cases
    $this->createDummyEnum('Empty', [], true);

    $this->artisan('db:permission')
        ->expectsOutputToContain("Seeding {$enum1Name}...")
        ->expectsOutputToContain("Seeding {$enum1Name} done.")
        ->expectsOutputToContain("Seeding {$enum2Name}...")
        ->expectsOutputToContain("Seeding {$enum2Name} done.")
         // It should also report seeding for the empty enum
        ->expectsOutputToContain('Seeding App\\Enums\\Permissions\\Test\\EmptyPermissions...')
        ->expectsOutputToContain('Seeding App\\Enums\\Permissions\\Test\\EmptyPermissions done.')
        // It should NOT report seeding for the enum without the contract
        ->doesntExpectOutputToContain('Seeding App\\Enums\\Permissions\\Test\\CommentPermissions...')
        ->assertExitCode(0);

    $this->assertDatabaseHas('permissions', ['name' => 'post.view', 'guard_name' => 'web']);
    $this->assertDatabaseHas('permissions', ['name' => 'post.create', 'guard_name' => 'web']);
    $this->assertDatabaseHas('permissions', ['name' => 'user.edit', 'guard_name' => 'web']);
    $this->assertDatabaseHas('permissions', ['name' => 'user.delete', 'guard_name' => 'web']);
    $this->assertDatabaseMissing('permissions', ['name' => 'comment.approve']); // From the ignored enum
    expect(Permission::count())->toBe(4); // Only 4 permissions should be created
});

it('seeds only a specific permission enum when name option is provided', function () {
    $enum1Name = $this->createDummyEnum('Post', ['post.view', 'post.create']);
    $enum2Name = $this->createDummyEnum('User', ['user.edit', 'user.delete']);

    $this->artisan('db:permission', ['--name' => 'Post'])
        ->expectsOutputToContain("Seeding {$enum1Name}...")
        ->expectsOutputToContain("Seeding {$enum1Name} done.")
        ->doesntExpectOutputToContain("Seeding {$enum2Name}...") // Should not seed the other one
        ->assertExitCode(0);

    $this->assertDatabaseHas('permissions', ['name' => 'post.view', 'guard_name' => 'web']);
    $this->assertDatabaseHas('permissions', ['name' => 'post.create', 'guard_name' => 'web']);
    $this->assertDatabaseMissing('permissions', ['name' => 'user.edit']); // From the other enum
    $this->assertDatabaseMissing('permissions', ['name' => 'user.delete']); // From the other enum
    expect(Permission::count())->toBe(2); // Only 2 permissions should be created
});

it('handles non-existent permission enum name gracefully', function () {
    $this->createDummyEnum('Post', ['post.view', 'post.create']);
    $this->artisan('db:permission', ['--name' => 'NonExistent'])
        ->expectsOutputToContain('failed')
        ->assertExitCode(0);

    $this->assertDatabaseMissing('permissions', ['name' => 'post.view']); // The existing one should not be seeded
    expect(Permission::count())->toBe(0); // No permissions should be created
});

it('ignores enums that do not implement EnumValues contract', function () {
    $enum1Name = $this->createDummyEnum('Valid', ['valid.action'], true);
    $invalidEnumName = $this->createDummyEnum('Invalid', ['invalid.action'], false); // Does not implement contract

    $this->artisan('db:permission')
        ->expectsOutputToContain("Seeding {$enum1Name}...")
        ->expectsOutputToContain("Seeding {$enum1Name} done.")
        ->doesntExpectOutputToContain("Seeding {$invalidEnumName}...") // Should not seed the invalid one
        ->assertExitCode(0);

    $this->assertDatabaseHas('permissions', ['name' => 'valid.action', 'guard_name' => 'web']);
    $this->assertDatabaseMissing('permissions', ['name' => 'invalid.action']); // From the invalid enum
    expect(Permission::count())->toBe(1); // Only 1 permission should be created
});
