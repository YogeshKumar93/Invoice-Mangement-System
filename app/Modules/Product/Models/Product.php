<?php

namespace App\Modules\Product\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        // 'sku',
        // 'hsn_code',
        // 'price',
        // 'gst',
        // 'description',
        'status'
    ];
}