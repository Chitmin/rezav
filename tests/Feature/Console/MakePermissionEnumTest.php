<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

pest()->group('console');

// Helper function to get the expected file path, now requires the directory path
function getPermissionEnumPath(string $name, string $permissionsDir): string
{
    $fileName = Str::studly(Str::singular($name)).'Permissions.php';

    return $permissionsDir.'/'.$fileName;
}

// Cleanup function to remove generated files and directory, now requires the directory path
function cleanupPermissionEnum(string $name, string $permissionsDir): void
{
    $filePath = getPermissionEnumPath($name, $permissionsDir);
    if (File::exists($filePath)) {
        File::delete($filePath);
    }
    // Remove the directory if it's empty
    if (File::isDirectory($permissionsDir) && count(File::files($permissionsDir)) === 0) {
        File::deleteDirectory($permissionsDir);
    }
}

beforeEach(function () {
    config(['permission.enums.directory' => 'Enums/TestPermissions']);
    $this->permissionsDir = app_path(config('permission.enums.directory'));

    // Clean up the directory before each test
    if (File::isDirectory($this->permissionsDir)) {
        File::deleteDirectory($this->permissionsDir);
    }
});

// Clean up the directory after all tests in this file are done
afterAll(function () {
    $permissionsDir = app_path(config('permission.enums.directory'));
    if (File::isDirectory($permissionsDir)) {
        File::deleteDirectory($permissionsDir);
    }
});

// Test successful creation
test('it creates a permission enum successfully', function () {
    $name = 'TestResource';
    // Pass the directory path to the helper function
    $expectedPath = getPermissionEnumPath($name, $this->permissionsDir);

    // Note: Directory cleanup is now handled by beforeEach

    $this->artisan('make:permission-enum', ['name' => $name])
        ->expectsOutput('Permission enum created successfully.')
        ->assertExitCode(0);

    // Assert the file was created
    expect(File::exists($expectedPath))->toBeTrue();

    // Assert the content is correct
    $expectedContent = file_get_contents(base_path('stubs/permission-enum.stub'));
    $expectedContent = str_replace(
        ['#NAMESPACE', '#NAME', '#RESOURCE'],
        [
            Str::replace('/', '\\', config('permission.enums.directory')),
            Str::studly(Str::singular($name)).'Permissions',
            Str::slug(Str::singular($name)),
        ],
        $expectedContent
    );
    expect(File::get($expectedPath))->toEqual($expectedContent);

    // Cleanup - pass the directory path
    cleanupPermissionEnum($name, $this->permissionsDir);
});

// Test file already exists
test('it returns failure when the permission enum already exists', function () {
    $name = 'ExistingResource';
    // Pass the directory path to the helper function
    $expectedPath = getPermissionEnumPath($name, $this->permissionsDir);

    // Create a dummy file to simulate existence
    File::ensureDirectoryExists(dirname($expectedPath));
    File::put($expectedPath, '<?php // Dummy content');

    $this->artisan('make:permission-enum', ['name' => $name])
        ->expectsOutput('Permission enum already exists!')
        ->assertExitCode(1); // Command::FAILURE is 1

    // Assert the dummy file wasn't overwritten (optional check, depends on desired behavior)
    expect(File::get($expectedPath))->toEqual('<?php // Dummy content');

    // Cleanup - pass the directory path
    cleanupPermissionEnum($name, $this->permissionsDir);
});

// Test missing argument prompt
test('it prompts for name if not provided', function () {
    $name = 'PromptedResource';
    // Pass the directory path to the helper function
    $expectedPath = getPermissionEnumPath($name, $this->permissionsDir);

    $this->artisan('make:permission-enum')
        ->expectsQuestion('What is the name of the permission?', $name)
        ->expectsOutput('Permission enum created successfully.')
        ->assertExitCode(0);

    // Assert the file was created
    expect(File::exists($expectedPath))->toBeTrue();

    // Cleanup - pass the directory path
    cleanupPermissionEnum($name, $this->permissionsDir);
});
