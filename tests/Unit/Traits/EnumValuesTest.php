<?php

enum BasicTestEnum: string
{
    use \App\Traits\EnumValues;

    case FOO = 'foo_value';
    case BAR = 'bar_value';
}

enum NameTestEnum: string
{
    use \App\Traits\EnumValues;

    case FOO_BAR = 'value';
}

enum OptionTestEnum: string
{
    use \App\Traits\EnumValues;

    case FOO = 'foo';
    case BAR = 'bar';
}

enum ListTestEnum: string
{
    use \App\Traits\EnumValues;

    case TEST_KEY_FOO = 'test_foo_value';
    case TEST_KEY_BAR = 'test_bar_value';
}

// Update test cases
test('values() returns enum values', function () {
    expect(BasicTestEnum::values())->toBe(['foo_value', 'bar_value']);
});

test('names() returns enum names', function () {
    expect(NameTestEnum::names())->toBe(['FOO_BAR']);
});

test('options() returns name=>value pairs', function () {
    expect(OptionTestEnum::options())->toEqual([
        'FOO' => 'foo',
        'BAR' => 'bar',
    ]);
});

test('all() is alias of values()', function () {
    expect(BasicTestEnum::all())->toBe(BasicTestEnum::values());
});

test('keys() is alias of names()', function () {
    expect(NameTestEnum::keys())->toBe(NameTestEnum::names());
});

test('options(true) returns value=>name pairs', function () {
    expect(OptionTestEnum::options(true))->toEqual([
        'foo' => 'FOO',
        'bar' => 'BAR',
    ]);
});

test('list() returns snake_case key-value pairs', function () {
    expect(ListTestEnum::list())->toEqual([
        'test_key_foo' => 'test_foo_value',
        'test_key_bar' => 'test_bar_value',
    ]);
});
