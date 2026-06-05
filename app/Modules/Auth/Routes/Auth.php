<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Modules\Auth\Controllers\AuthController;


Route::get('/', function () {
    return Inertia::render('Landing/LandingPage');
});
// Login page - GET request
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Login submit - POST request
Route::post('/login', [AuthController::class, 'signIn'])->name('login.submit');

// Dashboard (after login)
Route::get('/dashboard', [AuthController::class, 'dashboard'])
    ->middleware('auth')
    ->name('dashboard');

// Logout
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');