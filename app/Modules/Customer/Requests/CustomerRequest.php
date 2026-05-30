<?php

namespace App\Modules\Customer\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => 'required|max:255',

            'email' => 'nullable|email',

            'phone' => 'required|max:20',

            'address' => 'nullable',

            'gst_number' => 'nullable|max:50'
        ];
    }
}