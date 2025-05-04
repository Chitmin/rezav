<?php

namespace Tests\Settings;

use Spatie\LaravelSettings\Settings;

class TestGeneralSettings extends Settings
{
    public string $name;

    public static function group(): string
    {
        return 'general';
    }
}
