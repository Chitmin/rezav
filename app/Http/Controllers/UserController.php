<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('users/index', [
            'users' => User::query()->latest()->paginate(10),
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User deleted.');
    }
}
