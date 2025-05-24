<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        return Inertia::render('users/profile', [
            'user' => $user->load('profile'),
        ]);
    }

    public function update(ProfileUpdateRequest $request, User $user)
    {
        $user = Auth::user();

        $userData = $request->safe()->only(['name', 'email']);
        $user->fill($userData);
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        $profileData = $request->safe()->except(['name', 'email']);

        /** @disregard P1013 */
        if ($request->file('avatar')?->isValid()) {
            /** @disregard P1014 */
            $path = $request->avatar->store('avatars', 'public');
            $profileData['avatar'] = Storage::url($path);
        }

        $user->profile->update($profileData);

        return to_route('users.profile.show', $user);
    }
}
