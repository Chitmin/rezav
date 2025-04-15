<?php

namespace Tests\Unit\Actions;

use App\Actions\GetAllEnumsPermissions;
use Tests\CreatesEnumFiles;
use Tests\TestCase;

pest()->uses(TestCase::class, CreatesEnumFiles::class);

beforeEach(function () {
    // Setup the temporary directory for enums before each test
    $this->setupEnumDirectory();
});

afterEach(function () {
    // Clean up the temporary directory after each test
    $this->teardownEnumDirectory();
});

it('retrieves all permission enums with their details', function () {
    // Arrange
    $permissions1 = ['blog_post.view_any', 'blog_post.create', 'blog_post.delete'];
    $enum1ShortName = 'BlogPost';
    $enum1FullName = $this->createDummyEnum($enum1ShortName, $permissions1);

    $permissions2 = ['general_settings.update'];
    $enum2ShortName = 'GeneralSettings';
    $enum2FullName = $this->createDummyEnum($enum2ShortName, $permissions2);

    // Create an enum without *Permissions suffix, it should be ignored by glob
    $this->createDummyEnum('ShouldIgnore', ['ignored.action'], true);
    // Override the file name to not match *Permissions.php
    rename(
        $this->enumBasePath.'/ShouldIgnorePermissions.php',
        $this->enumBasePath.'/ShouldIgnoreEnum.php'
    );

    $action = new GetAllEnumsPermissions;

    // Act
    $resultGenerator = $action();
    $results = iterator_to_array($resultGenerator); // Convert generator to array

    // Assert
    expect($results)->toBeArray();
    expect($results)->toHaveCount(2); // Only the two *Permissions.php files

    // Check first enum
    expect($results[0])->toMatchObject([
        'name' => $enum1FullName,
        'label' => 'Blog Post', // Calculated from 'BlogPost'
        'permissions' => $permissions1,
    ]);

    // Check second enum
    expect($results[1])->toMatchObject([
        'name' => $enum2FullName,
        'label' => 'General Settings', // Calculated from 'GeneralSettings'
        'permissions' => $permissions2,
    ]);

});

it('returns an empty array when no permission enums exist', function () {
    // Arrange
    // Ensure the directory is empty (handled by setupEnumDirectory)
    $action = new GetAllEnumsPermissions;

    // Act
    $resultGenerator = $action();
    $results = iterator_to_array($resultGenerator);

    // Assert
    expect($results)->toBeArray();
    expect($results)->toBeEmpty();
});

it('correctly calculates labels for multi-word enum names', function () {
    // Arrange
    $permissions = ['very_complex_module.do_stuff'];
    $enumShortName = 'VeryComplexModule';
    $enumFullName = $this->createDummyEnum($enumShortName, $permissions);

    $action = new GetAllEnumsPermissions;

    // Act
    $resultGenerator = $action();
    $results = iterator_to_array($resultGenerator);

    // Assert
    expect($results)->toHaveCount(1);
    expect($results[0])->toMatchObject([
        'name' => $enumFullName,
        'label' => 'Very Complex Module', // Calculated from 'VeryComplexModule'
        'permissions' => $permissions,
    ]);
});
