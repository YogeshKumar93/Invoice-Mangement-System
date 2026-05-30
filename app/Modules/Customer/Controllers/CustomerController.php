<?php

namespace App\Modules\Customer\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Customer\Models\Customer;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::latest()
            ->paginate(20);

        return Inertia::render('Customers/Customer',[
            'customers' => $customers
        ]);
    }

    public function store()
    {
    }

    public function update()
    {
    }

    public function destroy()
    {
    }
}