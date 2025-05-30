<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/password', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request, ?User $user = null): RedirectResponse
    {
        if (! $request->user()->can('updatePassword')) {
            return back(303)->with('error', 'You do not have permission to update this user\'s password.');
        }

        $rules = [
            'password' => ['required', Password::defaults(), 'confirmed'],
        ];

        if (! $user) {
            $rules['current_password'] = ['required', 'current_password'];
        }

        $validated = $request->validate($rules);
        $currentUser = $user ?? $request->user();

        $currentUser->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back(303);
    }
}
