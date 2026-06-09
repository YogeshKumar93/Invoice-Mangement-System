<?php

namespace App\Modules\Customer\Models;

use Illuminate\Database\Eloquent\Model;
use App\Modules\Product\Models\Product;

class CustomerRecordItem extends Model
{
    protected $fillable = [
        'customer_record_id',
        'product_id',
        'price'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}