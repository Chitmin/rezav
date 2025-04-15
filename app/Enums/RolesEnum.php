<?php

namespace App\Enums;

use App\Contracts\HasEnumTitle;
use App\Contracts\HasEnumValues;
use App\Traits\EnumValues;

enum RolesEnum: string implements HasEnumTitle, HasEnumValues
{
    use EnumValues;

    case SUPERADMIN = 'super-admin';
    case MANAGER = 'manager';

    public function title(): string
    {
        return match ($this) {
            self::SUPERADMIN => 'Super Admin',
            self::MANAGER => 'Manager',
        };
    }
}
