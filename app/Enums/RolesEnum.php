<?php

namespace App\Enums;

use App\Traits\EnumValues;

enum RolesEnum: string
{
    use EnumValues;

    case SUPERADMIN = 'super-admin';

    public function label(): string
    {
        return match ($this) {
            self::SUPERADMIN => 'Super Admin',
        };
    }
}
