<?php

namespace Tests\Traits;

enum BasicTestEnum: string
{
    use \App\Traits\EnumValues;

    case FOO = 'foo_value';
    case BAR = 'bar_value';
}
