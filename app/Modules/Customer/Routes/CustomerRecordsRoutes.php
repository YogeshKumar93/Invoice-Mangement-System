<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Customer\Controllers\CustomerRecordController;

Route::prefix('customers')->group(function () {

    Route::get(
        '/{customer}/records',
        [CustomerRecordController::class, 'records']
    )->name('customer.records');

    Route::post(
        '/{customer}/records',
        [CustomerRecordController::class, 'store']
    )->name('customer.records.store');
});