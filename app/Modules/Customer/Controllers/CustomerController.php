<?php

namespace App\Modules\Customer\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Customer\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::latest()
            ->paginate(20);

        return Inertia::render('Customers/Customer', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email'  => 'nullable|email|max:255',
            'address'=> 'nullable|string',
            'gst_number' => 'nullable|string|max:50',
            'status' => 'boolean',
        ]);

        Customer::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Customer created successfully'
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email'  => 'nullable|email|max:255',
            'address'=> 'nullable|string',
            'gst_number' => 'nullable|string|max:50',
            'status' => 'boolean',
        ]);

        $customer->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Customer updated successfully'
        ]);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer deleted successfully'
        ]);
    }
}