<?php

namespace App\Modules\User\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class UserModel extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'password',
        'role',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => 'boolean',
    ];

    /**
     * Auto-generate user_id: MYMS1, MYMS2, MYMS3...
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($user) {
            if (empty($user->user_id)) {
                $lastUser = static::orderBy('id', 'desc')->first();
                $nextNumber = $lastUser ? ($lastUser->id + 1) : 1;
                $user->user_id = 'MYMS' . $nextNumber;
            }
        });
    }

    /**
     * Route binding by user_id
     */
    public function getRouteKeyName()
    {
        return 'user_id';
    }
}