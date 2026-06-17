<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1|max:150',
            'disease' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Patient name is required',
            'age.required' => 'Age is required',
            'age.integer' => 'Age must be a number',
            'disease.required' => 'Diagnosis is required',
            'phone.required' => 'Phone number is required',
        ];
    }
}
