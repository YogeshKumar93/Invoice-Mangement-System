<?php

namespace App\Modules\Customer\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Customer\Models\Customer;
use Illuminate\Http\Request;
use App\Modules\Product\Models\Product;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::select(
    'id',
    'name',
    'phone',
    'address',
    'aadhaar',
    'image',
    'guarantor_name',
    'guarantor_phone',
    'guarantor_address',
    'guarantor_relation'
)
->latest()
->paginate(20);

        return Inertia::render('Customers/Customer', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',

            'address'=> 'nullable|string',
            'aadhaar' => 'nullable|string|max:20',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

            'guarantor_name' => 'nullable|string|max:255',
'guarantor_phone' => 'nullable|digits_between:10,15',
'guarantor_address' => 'nullable|string|max:500',
'guarantor_relation' => 'nullable|string|max:100',
        ]);

         if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')
            ->store('customers', 'public');
    }

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
            'phone' => 'nullable|string|max:20',
            
            'address'=> 'nullable|string',
            'aadhaar' => 'nullable|string|max:20',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

            'guarantor_name' => 'nullable|string|max:255',
'guarantor_phone' => 'nullable|digits_between:10,15',
'guarantor_address' => 'nullable|string|max:500',
'guarantor_relation' => 'nullable|string|max:100',
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

    public function records(Customer $customer)
{
    return Inertia::render(
        'Customers/CustomerRecords',
        [
            'customer' => $customer
        ]
    );
}


public function products()
{
    return response()->json(
        Product::select(
            'id',
            'name'
        )->get()
    );
}

}