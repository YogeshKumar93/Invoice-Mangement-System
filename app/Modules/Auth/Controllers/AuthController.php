<?php

namespace App\Modules\Auth\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->except(['logout', 'dashboard']);
        $this->middleware('auth')->only(['logout', 'dashboard']);
    }

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function signIn(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Check if user exists
        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return back()->withErrors(['username' => 'User not found']);
        }

        // Verify password
        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Wrong password']);
        }

        // Login the user
        Auth::login($user, $request->remember ?? false);
        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard/Dashboard', [
            'user' => Auth::user(),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}