<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait EnumValues
{
    /**
     * Get all enum values
     *
     * @return string[]
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Alias of `values`
     *
     * @return string[]
     */
    public static function all(): array
    {
        return static::values();
    }

    /**
     * Get all enum names
     *
     * @return string[]
     */
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    /**
     * Alias of `names`
     *
     * @return string[]
     */
    public static function keys(): array
    {
        return static::names();
    }

    /**
     * Get enum options as ready for html `select` element
     *
     * @param  bool  $reverse
     */
    public static function options($reverse = false): array
    {
        $cases = static::cases();
        $list = [];

        foreach ($cases as $case) {
            $reverse
                ? ($list[$case->value] = $case->name)
                : ($list[$case->name] = $case->value);

        }

        return $list;
    }

    /**
     * Get enum list as snake case key-value pairs.
     */
    public static function list(): array
    {
        $cases = static::cases();
        $list = [];

        foreach ($cases as $case) {
            $name = Str::of($case->name)->lower()->snake()->value;
            $value = Str::of($case->value)->lower()->snake()->value;
            $list[$name] = $value;
        }

        return $list;
    }
}
