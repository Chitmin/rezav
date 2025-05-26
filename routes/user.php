<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('users')->breadcrumb('Users');
    Route::get('users/{user}', [UserController::class, 'show'])
        ->name('users.show')
        ->breadcrumb(fn (User $user) => $user->name, 'users');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])
        ->name('users.edit')
        ->breadcrumb('Edit', 'users.show');
    Route::delete('users/{user}', [UserController::class, 'destroy'])
        ->name('users.destroy');

    Route::get('users/{user}/profile', [ProfileController::class, 'show'])
        ->name('users.profile.show')
        ->breadcrumb('Profile', 'users.show');

    Route::put('users/{user}/profile', [ProfileController::class, 'update'])
        ->name('users.profile.update');
});
