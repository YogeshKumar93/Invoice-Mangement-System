<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Customer\Controllers\CustomerController;

Route::name('customers.')->group(function () {

    Route::get('/customers', [CustomerController::class, 'index'])
        ->name('index');

    Route::post('/customers', [CustomerController::class, 'store'])
        ->name('store');

    Route::put('/customers/{customer}', [CustomerController::class, 'update'])
        ->name('update');

    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])
        ->name('destroy');

});