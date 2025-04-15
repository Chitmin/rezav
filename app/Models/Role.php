<?php

namespace App\Models;

use App\Enums\RolesEnum;
use Database\Factories\RoleFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    use HasFactory;

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
        return Attribute::make(
            get: fn () => RolesEnum::tryFrom($this->name)?->title() ?? $this->name,
        );
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return RoleFactory::new();
    }
}
