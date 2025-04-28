<?php

namespace App\Http\Controllers\Settings;

use App\Actions\GetAllGlobalSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function index(GetAllGlobalSettings $settingGroups): Response
    {
        return Inertia::render('settings/app', [
            'settingGroups' => $settingGroups(),
        ]);
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        //
        return back();
    }
}
