<?php

namespace App\Modules\User\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\User\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = UserModel::latest()->get();

        return Inertia::render('Users/User', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
             'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users,email',
    'username' => 'nullable|string|max:255',
    'password' => 'required|min:6',
    'phone' => 'nullable|string|max:20',
    // 'role' => 'nullable|string',
        ]);

       UserModel::create([
    'name' => $request->name,
    'email' => $request->email,
    'username' => $request->username ?? $request->email, // fallback safe
    'phone' => $request->phone,
    // 'role' => $request->role ?? 'user',
    // 'status' => 1,
    'password' => Hash::make($request->password),
]);

        return back();
    }

    public function update(Request $request, $id)
    {
        $user = UserModel::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
              'username' => 'nullable|string|max:255',
            // 'role' => 'nullable|string',
            // 'status' => 'boolean',
        ]);

        $data = [
            'name' => $request->name,
    'email' => $request->email,
    'username' => $request->username,
    'phone' => $request->phone,
    // 'role' => $request->role,
    // 'status' => $request->status ?? 1,
        ];

        // password only update if sent
        if ($request->filled('password')) {
            $request->validate([
                'password' => 'min:6',
            ]);

            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return back();
    }

    public function destroy($id)
    {
        $user = UserModel::findOrFail($id);
        $user->delete();

        return back();
    }
}