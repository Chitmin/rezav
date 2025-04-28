<?php

namespace App\Supports\TypeScriptTransformer;

use ReflectionClass;
use Spatie\LaravelTypeScriptTransformer\Transformers\DtoTransformer;
use Spatie\TypeScriptTransformer\Collectors\Collector;
use Spatie\TypeScriptTransformer\Structures\TransformedType;

class DtoCollector extends Collector
{
    const NAMESPACE_PATH = 'App\Dtos';

    public function shouldCollect(ReflectionClass $class): bool
    {
        return $class->getNamespaceName() === self::NAMESPACE_PATH;
    }

    public function getTransformedType(ReflectionClass $class): ?TransformedType
    {
        if (! $this->shouldCollect($class)) {
            return null;
        }

        $transformer = new DtoTransformer($this->config);

        return $transformer->transform(
            $class,
            $class->getShortName()
        );
    }
}
