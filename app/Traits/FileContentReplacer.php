<?php

namespace App\Traits;

trait FileContentReplacer
{
    /**
     * Replace the given placeholder in the given file with the given value
     *
     * @param  string  $file
     * @param  array  $replacements
     */
    protected function replaceInFile($file, $replacements = []): string
    {
        $contents = file_get_contents($file);

        foreach ($replacements as $search => $replace) {
            $contents = str_replace($search, $replace, $contents);
        }

        return $contents;
    }
}
