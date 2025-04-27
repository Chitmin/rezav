<?php

use App\Traits\FileContentReplacer;
use Tests\TestCase;

pest()->uses(TestCase::class, FileContentReplacer::class);

beforeEach(function () {
    $this->testFile = sys_get_temp_dir().'/testfile.txt';
    file_put_contents($this->testFile, 'Hello {{name}}, your code is {{code}}');
});

afterEach(function () {
    if (file_exists($this->testFile)) {
        unlink($this->testFile);
    }
});

test('it replaces single placeholder', function () {
    $result = $this->replaceInFile($this->testFile, ['{{name}}' => 'Alice']);

    expect($result)->toContain('Hello Alice, your code is {{code}}')
        ->and($result)->not->toContain('{{name}}');
});

test('it replaces multiple placeholders', function () {
    $result = $this->replaceInFile($this->testFile, [
        '{{name}}' => 'Bob',
        '{{code}}' => 'ABC123',
    ]);

    expect($result)->toBe('Hello Bob, your code is ABC123');
});

test('it handles empty replacements', function () {
    $originalContent = file_get_contents($this->testFile);
    $result = $this->replaceInFile($this->testFile, []);

    expect($result)->toBe($originalContent);
});

test('it returns original content when no matches', function () {
    $result = $this->replaceInFile($this->testFile, [
        '{{invalid}}' => 'value',
    ]);

    expect($result)->toBe('Hello {{name}}, your code is {{code}}');
});
