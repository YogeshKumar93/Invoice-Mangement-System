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
        'phone' => 'nullable|max:20',
        'address' => 'nullable',
        'aadhaar' => 'nullable|max:20',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

        ];
    }
}