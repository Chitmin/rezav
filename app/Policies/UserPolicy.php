<?php

namespace App\Policies;

use App\Enums\Permissions\UserPermissions;
use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can(UserPermissions::VIEW_ANY);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return $user->id === $model->id && $user->can(UserPermissions::VIEW);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can(UserPermissions::CREATE);
    }

    /**
     * Determine whether the user can update any models.
     */
    public function updateAny(User $user): bool
    {
        return $user->can(UserPermissions::UPDATE_ANY);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        return $user->id === $model->id && $user->can(UserPermissions::UPDATE);
    }

    /**
     * Determine whether the user can update any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->can(UserPermissions::DELETE_ANY);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return $user->id === $model->id && $user->can(UserPermissions::DELETE);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user): bool
    {
        return $user->can(UserPermissions::RESTORE);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user): bool
    {
        return $user->can(UserPermissions::FORCE_DELETE);
    }

    /**
     * Determine whether the user can update the model's password.
     */
    public function updatePassword(User $user, ?User $model = null): bool
    {
        $permission = is_null($model)
            ? UserPermissions::UPDATE_PASSWORD_ANY
            : UserPermissions::UPDATE_PASSWORD;

        return $user->can($permission);
    }
}
