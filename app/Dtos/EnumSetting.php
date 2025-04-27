<?php

namespace App\Dtos;

final readonly class EnumSetting
{
    public function __construct(
        public readonly string $name,
        public readonly array $settings,
    ) {}

    public static function make(string $name, array $settings): self
    {
        return new self($name, $settings);
    }
}
