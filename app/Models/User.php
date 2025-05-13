<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RolesEnum;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Scope a query to only include all users except super-admins.
     */
    #[Scope]
    protected function withoutSuperAdmins(Builder $query): void
    {
        $query->whereDoesntHave('roles', fn ($q) => $q->where('name', RolesEnum::SUPERADMIN->value));
    }

    /**
     * Scope a query to only include all users except currently authenticated user.
     */
    #[Scope]
    protected function withoutAuthed(Builder $query): void
    {
        if ($authed = Auth::user()) {
            $query->where('id', '!=', $authed->id);
        }
    }
}
