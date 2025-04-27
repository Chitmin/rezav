<?php

namespace Tests\Traits;

enum ListTestEnum: string
{
    use \App\Traits\EnumValues;

    case TEST_KEY_FOO = 'test_foo_value';
    case TEST_KEY_BAR = 'test_bar_value';
}
