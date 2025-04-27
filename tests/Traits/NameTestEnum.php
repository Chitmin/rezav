<?php

namespace Tests\Traits;

enum NameTestEnum: string
{
    use \App\Traits\EnumValues;

    case FOO_BAR = 'value';
}
