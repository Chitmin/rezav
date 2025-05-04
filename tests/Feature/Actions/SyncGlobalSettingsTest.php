<?php

use App\Actions\SyncGlobalSettings;
use Tests\Settings\TestGeneralSettings;
use Tests\Settings\TestThemeSettings;

test('settings are updated as input provided', function () {
    config()->set('settings.settings', [
        TestGeneralSettings::class,
        TestThemeSettings::class,
    ]);

    config()->set('settings.cache.enabled', false);

    TestGeneralSettings::fake([
        'name' => 'example',
    ], false);

    TestThemeSettings::fake([
        'color' => 'blue',
    ], false);

    $inputs = [
        'general' => ['name' => 'elpmaxe'],
        'theme' => ['color' => 'red'],
    ];

    $setting = new SyncGlobalSettings;
    $setting($inputs);

    expect(app(TestGeneralSettings::class)->name)->toBe('elpmaxe');
    expect(app(TestThemeSettings::class)->color)->toBe('red');
});

test('it returns empty array when no settings configured', function () {
    config()->set('settings.settings', []);
    expect((new SyncGlobalSettings)->__invoke([]))->toBeEmpty();
});
