<?php

namespace Tests\Traits;

enum OptionTestEnum: string
{
    use \App\Traits\EnumValues;

    case FOO = 'foo';
    case BAR = 'bar';
}
