<?php

namespace App\Modules\Product\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Product\Models\Product;
use App\Modules\Product\Requests\ProductRequest;
use App\Modules\Product\Services\ProductService;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $service
    ) {}

    // LIST PAGE (Inertia)
    public function index()
    {
        $products = Product::latest()
            ->paginate(20);

        return Inertia::render('Products/Product', [
            'products' => $products
        ]);
    }

    // CREATE (API RESPONSE)
    public function store(ProductRequest $request)
    {
        $product = $this->service->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Product Created Successfully',
            'data' => $product
        ]);
    }

    // UPDATE (API RESPONSE)
    public function update(
        ProductRequest $request,
        Product $product
    ) {
        $updated = $this->service->update(
            $product,
            $request->validated()
        );

        return response()->json([
            'message' => 'Product Updated Successfully',
            'data' => $updated
        ]);
    }

    // DELETE (API RESPONSE)
    public function destroy(Product $product)
    {
        $this->service->delete($product);

        return response()->json([
            'message' => 'Product Deleted Successfully'
        ]);
    }
}