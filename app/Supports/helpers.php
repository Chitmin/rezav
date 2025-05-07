<?php

namespace App\Supports;

use Generator;
use Illuminate\Database\Eloquent\Builder;

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

if (! function_exists('App\Supports\apply_sorting_to_query')) {

    /**
     * Apply sorting to query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder<static>  $query
     * @param  array<string, 'desc' | 'asc'>  $sort
     * @return \Illuminate\Database\Eloquent\Builder<static>
     */
    function apply_sorting_to_query(Builder $query, array $sort): Builder
    {
        foreach ($sort as $field => $direction) {
            $query->orderBy($field, $direction);
        }

        return $query;
    }
}
