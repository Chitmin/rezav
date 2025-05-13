<?php

use App\Http\Controllers\AccessControlController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\AppController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard', [], 301);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard')->breadcrumb('Dashboard');

    Route::get('access-control', [AccessControlController::class, 'index'])
        ->name('access-control')
        ->breadcrumb('Access Control');

    Route::put('access-control', [AccessControlController::class, 'update'])
        ->name('access-control.update');

    Route::get('settings', [AppController::class, 'index'])->name('settings')->breadcrumb('Settings');
    Route::put('settings', [AppController::class, 'update'])->name('settings.update');

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
        ->name('users.profile')
        ->breadcrumb('Profile', 'users.show');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
