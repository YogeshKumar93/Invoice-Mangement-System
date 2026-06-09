<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Customer\Controllers\CustomerController;
// use App\Modules\Customer\Controllers\CustomerRecordController;

Route::name('customers.')->group(function () {

    Route::get('/customers', [CustomerController::class, 'index'])
        ->name('index');

    Route::post('/customers', [CustomerController::class, 'store'])
        ->name('store');

    Route::put('/customers/{customer}', [CustomerController::class, 'update'])
        ->name('update');

    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])
        ->name('destroy');

        // Route::get('/customers/{customer}/records',[CustomerRecordController::class, 'index']);
        // Route::post('/customers/{customer}/records',[CustomerRecordController::class, 'store']);

        Route::get('/customer-products',[CustomerController::class,'products']);

});