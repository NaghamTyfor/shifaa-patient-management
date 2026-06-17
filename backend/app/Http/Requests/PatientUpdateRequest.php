<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'age' => 'sometimes|integer|min:1|max:150',
            'disease' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
        ];
    }
}
