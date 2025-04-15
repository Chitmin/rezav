<?php

namespace App\Dtos;

final readonly class EnumPermission
{
    public function __construct(
        public readonly string $name,
        public readonly string $label,
        public readonly array $permissions,
    ) {}

    public static function make(string $name, string $label, array $permissions): self
    {
        return new self($name, $label, $permissions);
    }
}
