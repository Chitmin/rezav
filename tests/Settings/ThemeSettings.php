<?php

namespace Tests\Settings;

use Spatie\LaravelSettings\Settings;

class ThemeSettings extends Settings
{
    public string $color;

    public static function group(): string
    {
        return 'theme';
    }
}
