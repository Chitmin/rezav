<?php

use App\Enums\Permissions\UserPermissions;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('password cannot be updated without proper permission', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/me')
        ->put('/users/password', [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    expect($response->getSession()->get('error'))->toBe(__('passwords.no_permission'));
    $response->assertRedirect('/me');
});

test('password can be updated', function () {
    $user = User::factory()->create();
    $this->seedsAllEnumPermissions();
    $user->givePermissionTo(UserPermissions::UPDATE_PASSWORD_ANY); // add permission

    $response = $this
        ->actingAs($user)
        ->from('/me')
        ->put('/users/password', [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/me');

    expect(Hash::check('new-password', $user->refresh()->password))->toBeTrue();
});

test('correct password must be provided to update password', function () {
    $user = User::factory()->create();
    $this->seedsAllEnumPermissions();
    $user->givePermissionTo(UserPermissions::UPDATE_PASSWORD_ANY); // add permission

    $response = $this
        ->actingAs($user)
        ->from('/me')
        ->put('/settings/password', [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

    $response
        ->assertSessionHasErrors('current_password')
        ->assertRedirect('/me');
});
