<?php

use App\Actions\GetAllGlobalSettings;
use App\Dtos\SettingValue;
use Illuminate\Support\Collection;
use Tests\Settings\TestGeneralSettings;
use Tests\Settings\TestThemeSettings;
use Tests\TestCase;

pest()->uses(TestCase::class);

test('it retrieves global settings grouped by formatted groups', function () {
    config()->set('settings.settings', [
        TestGeneralSettings::class,
        TestThemeSettings::class,
    ]);

    $generalMock = new class extends TestGeneralSettings
    {
        public static function group(): string
        {
            return 'general';
        }

        public function toCollection(): Collection
        {
            return collect(['site_name' => 'Test Site']);
        }
    };

    $themeMock = new class extends TestThemeSettings
    {
        public static function group(): string
        {
            return 'theme-settings';
        }

        public function toCollection(): Collection
        {
            return collect(['primary_color' => '#3490dc']);
        }
    };

    app()->instance(TestGeneralSettings::class, $generalMock);
    app()->instance(TestThemeSettings::class, $themeMock);

    $result = (new GetAllGlobalSettings)->__invoke();

    expect($result)->toMatchArray([
        'General' => [
            new SettingValue('site_name', 'Test Site', 'Site Name', 'general', 'string', false),
        ],
        'Theme Settings' => [
            new SettingValue('primary_color', '#3490dc', 'Primary Color', 'theme-settings', 'string', false),
        ],
    ]);
});

test('it returns empty array when no settings configured', function () {
    config()->set('settings.settings', []);
    expect((new GetAllGlobalSettings)->__invoke())->toBeEmpty();
});
