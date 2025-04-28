<?php

use App\Actions\SyncGlobalSettings;
use Tests\Settings\GeneralSettings;
use Tests\Settings\ThemeSettings;
use Tests\TestCase;

pest()->uses(TestCase::class);

test('settings are updated as input provided', function () {
    config()->set('settings.settings', [
        GeneralSettings::class,
        ThemeSettings::class,
    ]);

    $generalMock = new class extends GeneralSettings
    {
        public string $name = 'example';

        public bool $saveCalled = false;

        public function save(): self
        {
            $this->saveCalled = true;
            return $this;
        }
    };

    $themeMock = new class extends ThemeSettings
    {
        public string $color = 'white';

        public bool $saveCalled = false;

        public function save(): self
        {
            $this->saveCalled = true;
            return $this;
        }
    };

    app()->instance(GeneralSettings::class, $generalMock);
    app()->instance(ThemeSettings::class, $themeMock);

    $oldGeneralSetting = clone app(GeneralSettings::class);
    $oldThemeSetting = clone app(ThemeSettings::class);

    $inputs = [
        'general' => ['name' => 'elpmaxe'],
        'theme' => ['color' => 'red'],
    ];

    new SyncGlobalSettings()->__invoke($inputs);

    $updatedGeneralSetting = app(GeneralSettings::class);
    $updatedThemeSetting = app(ThemeSettings::class);

    expect($updatedGeneralSetting->name)->not->toBe($oldGeneralSetting->name);
    expect($updatedThemeSetting->color)->not->toBe($oldThemeSetting->color);

    expect($oldGeneralSetting->saveCalled)->toBeFalse();
    expect($oldThemeSetting->saveCalled)->toBeFalse();
    expect($updatedGeneralSetting->saveCalled)->toBeTrue();
    expect($updatedThemeSetting->saveCalled)->toBeTrue();
});

test('it returns empty array when no settings configured', function () {
    config()->set('settings.settings', []);
    expect((new SyncGlobalSettings)->__invoke([]))->toBeEmpty();
});
