<?php

use App\Actions\GetAllGlobalSettings;
use App\Dtos\SettingValue;
use Illuminate\Support\Collection;
use Tests\Settings\GeneralSettings;
use Tests\Settings\ThemeSettings;
use Tests\TestCase;

pest()->uses(TestCase::class);

test('it retrieves global settings grouped by formatted groups', function () {
    config()->set('settings.settings', [
        GeneralSettings::class,
        ThemeSettings::class,
    ]);

    $generalMock = new class extends GeneralSettings
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

    $themeMock = new class extends ThemeSettings
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

    app()->instance(GeneralSettings::class, $generalMock);
    app()->instance(ThemeSettings::class, $themeMock);

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
