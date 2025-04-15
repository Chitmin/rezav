<?php

namespace App\Contracts;

interface HasEnumValues
{
    /**
     * Get all enum values
     *
     * @return string[]
     */
    public static function values(): array;

    /**
     * Alias of `values`
     *
     * @return string[]
     */
    public static function all(): array;

    /**
     * Get all enum names
     *
     * @return string[]
     */
    public static function names(): array;

    /**
     * Alias of `names`
     *
     * @return string[]
     */
    public static function keys(): array;

    /**
     * Get enum options as ready for html `select` element
     *
     * @param  bool  $reverse
     */
    public static function options($reverse = false): array;
}
