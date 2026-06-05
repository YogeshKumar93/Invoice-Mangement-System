<?php

namespace App\Modules\User\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UserModel extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';

   protected $fillable = [
    'name',
    'email',
    'username',
    'phone',
    'password',
    // 'role',
    // 'status',
];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    //  protected $casts = [
    //     'status' => 'boolean',
    // ];
}