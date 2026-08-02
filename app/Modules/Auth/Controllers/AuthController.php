<?php

namespace App\Modules\Auth\Controllers;

use App\Modules\User\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
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
        // Validate input - CHANGED: username -> user_id
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string',
            'password' => 'required|string',
        ], [
            'user_id.required' => 'User ID is required',
            'password.required' => 'Password is required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // CHANGED: Find by user_id instead of username
        $user = UserModel::where('user_id', $request->user_id)->first();

        if (!$user) {
            return back()->withErrors(['user_id' => 'Invalid User ID or Password']);
        }

        // Check if user is active
        if (isset($user->status) && !$user->status) {
            return back()->withErrors(['user_id' => 'Account is deactivated. Contact admin.']);
        }

        // Verify password
        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['user_id' => 'Invalid User ID or Password']);
        }

        // Store user in session (for Inertia SSR)
        session(['user' => [
    'id' => $user->id,
    'user_id' => $user->user_id,
    'name' => $user->name,
    'email' => $user->email,
    'role' => $user->role,
]]);
session(['is_logged_in' => true]);

        // Login the user
        Auth::login($user, $request->remember ?? false);
        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard/Dashboard', [
            'user' => Auth::user() ?? Session::get('user'),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        Session::flush();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}