<?php

namespace App\Modules\Customer\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerRecord extends Model
{
    protected $fillable = [
        'customer_id',
        'total_amount',
        'status'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function items()
    {
        return $this->hasMany(CustomerRecordItem::class);
    }
}