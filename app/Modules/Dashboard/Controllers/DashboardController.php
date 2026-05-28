<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Dashboard', [
            'stats' => [
                'totalInvoices' => 120,
                'paidInvoices' => 90,
                'pendingInvoices' => 30,
                'revenue' => 500000,
            ]
        ]);
    }
}