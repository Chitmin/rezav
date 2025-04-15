<?php

namespace App\Models;

use App\Enums\RolesEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'name' => RolesEnum::class,
        ];
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['label'];

    /**
     * Get the name of the role as label.
     */
    protected function label(): Attribute
    {
        /** @var RolesEnum */
        $name = $this->name;

        return Attribute::make(
            get: fn () => $name->title(),
        );
    }
}
