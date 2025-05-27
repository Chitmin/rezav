<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('me', [ProfileController::class, 'show'])
        ->name('me.show')
        ->breadcrumb('Your Profile');
    Route::put('me', [ProfileController::class, 'update'])
        ->name('me.update');

    Route::put('users/password/{user?}', [PasswordController::class, 'update'])->name('user.password.update');

    Route::get('users', [UserController::class, 'index'])->name('users')->breadcrumb('Users');
    Route::get('users/{user}', [UserController::class, 'show'])
        ->name('users.show')
        ->breadcrumb(fn (User $user) => $user->name, 'users');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])
        ->name('users.edit')
        ->breadcrumb('Edit', 'users.show');
    Route::put('users/{user}', [UserController::class, 'update'])
        ->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])
        ->name('users.destroy');
});
