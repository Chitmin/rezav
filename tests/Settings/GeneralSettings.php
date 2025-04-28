<?php

namespace Tests\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $name;

    public static function group(): string
    {
        return 'general';
    }
}
