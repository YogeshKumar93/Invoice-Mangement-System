<?php

namespace App\Modules\Customer\Controllers;

use App\Modules\Customer\Models\CustomerRecord;
use App\Modules\Customer\Models\CustomerRecordItem;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Modules\Customer\Models\Customer;
use Illuminate\Http\Request;
use App\Modules\Product\Models\Product;
use Inertia\Inertia;


class CustomerRecordController extends Controller
{
public function store(Request $request)
{
    DB::transaction(function () use ($request) {

        $total = collect(
            $request->items
        )->sum('price');

        $record = CustomerRecord::create([
            'customer_id' => $request->customer_id,
            'total_amount' => $total,
            'status' => 'Pending'
        ]);

        foreach ($request->items as $item) {

            CustomerRecordItem::create([
                'customer_record_id' => $record->id,
                'product_id' => $item['product_id'],
                'price' => $item['price']
            ]);
        }
    });

    return response()->json([
        'message' => 'Saved'
    ]);
}

public function records(Customer $customer)
{
    $records = CustomerRecord::with(
        'items.product'
    )
    ->where(
        'customer_id',
        $customer->id
    )
    ->latest()
    ->get();

    return Inertia::render(
        'Customers/CustomerRecords',
        [
            'customer' => $customer,
            'records' => $records
        ]
    );
}
}