<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

pest()->group('console');

// Helper function to get the expected file path
function getSettingEnumPath(string $name, string $settingsDir): string
{
    $fileName = Str::studly(Str::singular($name)).'.php';

    return $settingsDir.'/'.$fileName;
}

// Cleanup function to remove generated files
function cleanupSettingEnum(string $name, string $settingsDir): void
{
    $filePath = getSettingEnumPath($name, $settingsDir);
    if (File::exists($filePath)) {
        File::delete($filePath);
    }
    // Remove directory if empty
    if (File::isDirectory($settingsDir) && count(File::files($settingsDir)) === 0) {
        File::deleteDirectory($settingsDir);
    }
}

beforeEach(function () {
    Config::set('settings.enums.directory', 'Enums/TestSettings');
    $this->settingsDir = app_path(config('settings.enums.directory'));
});

test('it creates a setting enum successfully', function () {
    $name = 'TestSetting';
    $expectedPath = getSettingEnumPath($name, $this->settingsDir);

    $this->artisan('make:setting-enum', ['name' => $name])
        ->expectsOutput('Setting enum created successfully.')
        ->assertExitCode(0);

    expect(File::exists($expectedPath))->toBeTrue();

    // Verify stub replacements
    $expectedContent = file_get_contents(base_path('stubs/setting-enum.stub'));
    $expectedContent = str_replace(
        ['#NAMESPACE', '#NAME'],
        [
            Str::replace('/', '\\', config('settings.enums.directory')),
            Str::studly(Str::singular($name)),
        ],
        $expectedContent
    );

    expect(File::get($expectedPath))->toEqual($expectedContent);

    cleanupSettingEnum($name, $this->settingsDir);
});

test('it returns failure when setting enum exists', function () {
    $name = 'ExistingSetting';
    $expectedPath = getSettingEnumPath($name, $this->settingsDir);

    File::ensureDirectoryExists(dirname($expectedPath));
    File::put($expectedPath, '<?php // Dummy content');

    $this->artisan('make:setting-enum', ['name' => $name])
        ->expectsOutput('Setting enum already exists!')
        ->assertExitCode(1);

    expect(File::get($expectedPath))->toEqual('<?php // Dummy content');

    cleanupSettingEnum($name, $this->settingsDir);
});

test('it prompts for name when missing', function () {
    $name = 'PromptedSetting';
    $expectedPath = getSettingEnumPath($name, $this->settingsDir);

    $this->artisan('make:setting-enum')
        ->expectsQuestion('What is the name of the setting?', $name)
        ->expectsOutput('Setting enum created successfully.')
        ->assertExitCode(0);

    expect(File::exists($expectedPath))->toBeTrue();

    cleanupSettingEnum($name, $this->settingsDir);
});
