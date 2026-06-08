<?php

namespace App\Modules\Customer\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
         'name',
    'phone',
    'address',
    'aadhaar',
    'image',
    ];
}