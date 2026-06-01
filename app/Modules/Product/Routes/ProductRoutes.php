<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Product\Controllers\ProductController;

Route::name('products.')->group(function () {

Route::get('/products', [ProductController::class,'index']);

Route::get('/products/create', [ProductController::class,'create']);

Route::post('/products', [ProductController::class,'store']);

Route::get('/products/{product}/edit', [ProductController::class,'edit']);

Route::put('/products/{product}', [ProductController::class,'update']);

Route::delete('/products/{product}', [ProductController::class,'destroy']);

});