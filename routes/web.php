<?php

use App\Http\Controllers\AccessControlController;
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

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
