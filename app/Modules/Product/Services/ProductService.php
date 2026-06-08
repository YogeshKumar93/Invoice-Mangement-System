<?php

namespace App\Modules\Product\Services;

use App\Modules\Product\Models\Product;

class ProductService
{
    public function create(array $data)
    {
       
        return Product::create($data);
    }

    public function update(Product $product,array $data)
    {
        $product->update([
        'name' => $data['name']
    ]);

        return $product;
    }

    public function delete(Product $product)
    {
        return $product->delete();
    }
}