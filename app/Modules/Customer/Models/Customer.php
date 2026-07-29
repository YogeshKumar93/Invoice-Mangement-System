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

         'gurantor_name',
         'gurantor_phone',
         'gurantor_address',
         'gurantor_relation',
    ];


    public function records()
{
    return $this->hasMany(CustomerRecord::class);
}

}