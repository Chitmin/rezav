<?php

namespace App\Dtos;

final readonly class SettingValue
{
    public function __construct(
        public readonly string $name,
        public readonly string $value,
        public readonly string $label,
        public readonly string $group,
        public readonly string $type,
        public readonly bool $isNumeric,
    ) {}

    public static function make(string $name, string $value, string $label, string $group, string $type, $isNumeric): self
    {
        return new self($name, $value, $label, $group, $type, $isNumeric);
    }
}
