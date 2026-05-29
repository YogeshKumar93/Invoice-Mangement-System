<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 📄 List Page
    public function index()
    {
        $users = User::latest()->get();

        return Inertia::render('Users/User', [
            'users' => $users
        ]);
    }

    // ➕ Store User
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => 1,
        ]);

        return redirect()->back()->with('success', 'User created successfully');
    }

    // ✏️ Update User
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'status' => $request->status ?? $user->status,
        ]);

        return redirect()->back()->with('success', 'User updated successfully');
    }

    // ❌ Delete User
    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'User deleted successfully');
    }
}