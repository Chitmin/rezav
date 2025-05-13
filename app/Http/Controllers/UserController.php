<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function App\Supports\apply_sorting_to_query;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $q = apply_sorting_to_query(User::withoutSuperAdmins()->withoutAuthed(), $request->query('sort') ?? []);

        return Inertia::render('users/index', [
            'users' => $q->paginate(10),
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

    public function profile(User $user)
    {
        return Inertia::render('users/profile', [
            'user' => $user,
        ]);
    }
}
