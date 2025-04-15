<?php

namespace App\Supports;

use Generator;

if (! function_exists('App\Supports\array_to_generator')) {

    /**
     * Convert array to generator.
     *
     * Useful for testing when using mock
     * and that mock have to return a generator type.
     */
    function array_to_generator(array $arr): Generator
    {
        foreach ($arr as $item) {
            yield $item;
        }
    }
}
