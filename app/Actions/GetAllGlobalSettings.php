<?php

namespace App\Actions;

use App\Dtos\SettingValue;
use Illuminate\Support\Str;

class GetAllGlobalSettings
{
    public function __invoke()
    {
        $settings = config('settings.settings');
        $list = [];

        foreach ($settings as $setting) {
            $group = app($setting);
            $groupName = $group->group();

            $settingGroup = $group->toCollection()->map(function ($value, $key) use ($groupName) {
                $label = Str::of($key)->replace(['_', '-'], ' ')->title()->value;

                return new SettingValue($key, $value, $label, $groupName, gettype($value), is_numeric($value));
            })->values()->toArray();

            $name = Str::of($groupName)->replace(['_', '-'], ' ')->title()->value;
            $list[$name] = $settingGroup;
        }

        return $list;
    }
}
