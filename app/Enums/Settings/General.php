<?php

namespace App\Enums\Settings;

use App\Contracts\HasEnumValues;
use App\Traits\EnumValues;

enum General: string implements HasEnumValues
{
    use EnumValues;

    case VERSION = '1.0.0';
    case CURRENCY = 'USD'; // ISO 4217
}
