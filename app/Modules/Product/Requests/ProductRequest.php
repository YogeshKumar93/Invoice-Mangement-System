<?php

namespace App\Modules\Product\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => 'required|max:255',

            'sku' => 'required|max:100',

            'hsn_code' => 'nullable|max:50',

            'price' => 'required|numeric',

            'gst' => 'required|numeric',

            'description' => 'nullable',

            'status' => 'required|boolean',
        ];
    }
}