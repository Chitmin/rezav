<?php

namespace App\Http\Controllers;

use App\Actions\GetAllEnumsPermissions;
use App\Enums\RolesEnum;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessControlController extends Controller
{
    public function index(GetAllEnumsPermissions $action)
    {
        return Inertia::render('access-control', [
            'roles' => Role::with('permissions')
                ->where('name', '!=', RolesEnum::SUPERADMIN->value)
                ->get()
                ->toArray(),
            'permissions' => iterator_to_array($action()),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'roles' => 'array',
        ]);

        foreach ($validated['roles'] as $role => $permissions) {
            // ignore super admin
            if ($role === RolesEnum::SUPERADMIN->value) {
                continue;
            }

            $role = Role::where('name', $role)->first();

            if ($role) {
                $role->syncPermissions($permissions);
            }
        }

        return to_route('access-control', [], 303)->with('success', 'Access Control updated');
    }
}
