<?php

namespace App\Actions;

use App\Dtos\EnumSetting;
use Generator;
use Illuminate\Support\Str;

class GetAllEnumsSettings
{
    /**
     * Get all enums settings.
     *
     * @return Generator<EnumSetting>
     */
    public function __invoke(): Generator
    {
        $dir = rtrim(config('settings.enums.directory', 'Enums/Settings'), '/');
        $path = app_path($dir);
        $namespace = 'App\\'.Str::replace('/', '\\', $dir);
        foreach (glob("{$path}/*.php") as $file) {
            $name = basename($file, '.php');
            $setting = $namespace.'\\'.$name;

            if (! class_exists($setting)) {
                continue;
            }

            yield new EnumSetting($setting, $setting::list());
        }
    }
}
