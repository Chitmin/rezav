<?php

namespace App\Actions;

class SyncGlobalSettings
{
    public function __invoke(array $inputs)
    {
        $config = config('settings.settings');
        $settings = array_reduce($config, function ($pre, $cur) {
            $pre[$cur::group()] = app($cur);

            return $pre;
        }, []);

        foreach ($settings as $group => $setting) {
            if (array_key_exists($group, $inputs)) {
                $setting->fill($inputs[$group]);
                $setting->save();
            }
        }
    }
}
