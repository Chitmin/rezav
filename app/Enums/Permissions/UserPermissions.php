<?php

namespace App\Enums\Permissions;

use App\Contracts\HasEnumTitle;
use App\Contracts\HasEnumValues;
use App\Traits\EnumValues;
use Illuminate\Support\Str;

enum UserPermissions: string implements HasEnumTitle, HasEnumValues
{
    use EnumValues;

    case VIEW_ANY = 'user.view-any';
    case VIEW = 'user.view';
    case CREATE = 'user.create';
    case CREATE_ANY = 'user.create-any';
    case UPDATE = 'user.update';
    case UPDATE_ANY = 'user.update-any';
    case DELETE = 'user.delete';
    case DELETE_ANY = 'user.delete-any';
    case RESTORE = 'user.restore';
    case FORCE_DELETE = 'user.force-delete';
    case UPDATE_PASSWORD = 'user.update-password';
    case UPDATE_PASSWORD_ANY = 'user.update-password-any';

    /**
     * The permission value as a title.
     */
    public function title(): string
    {
        [$resource, $permission] = explode('.', $this->value);
        $title = $permission.' '.$resource;

        return Str::title(Str::replace(['-', '_'], ' ', $title));
    }
}
