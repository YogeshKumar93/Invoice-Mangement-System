<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Customer\Controllers\CustomerController;

Route::prefix('customers')
    ->name('customers.')
    ->group(function () {

        Route::get('/', [CustomerController::class,'index'])
            ->name('index');

        Route::post('/', [CustomerController::class,'store'])
            ->name('store');

        Route::put('/{customer}', [CustomerController::class,'update'])
            ->name('update');

        Route::delete('/{customer}', [CustomerController::class,'destroy'])
            ->name('destroy');
    });