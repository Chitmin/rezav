<?php

namespace App\Supports\TypeScriptTransformer;

use ReflectionClass;
use Spatie\LaravelSettings\Settings;
use Spatie\LaravelTypeScriptTransformer\Transformers\DtoTransformer;
use Spatie\TypeScriptTransformer\Collectors\Collector;
use Spatie\TypeScriptTransformer\Structures\TransformedType;

class SettingCollector extends Collector
{
    public function shouldCollect(ReflectionClass $class): bool
    {
        return $class->isSubclassOf(Settings::class);
    }

    public function getTransformedType(ReflectionClass $class): ?TransformedType
    {
        if (! $class->isSubclassOf(Settings::class)) {
            return null;
        }

        $transformer = new DtoTransformer($this->config);

        return $transformer->transform(
            $class,
            $class->getShortName()
        );
    }
}
