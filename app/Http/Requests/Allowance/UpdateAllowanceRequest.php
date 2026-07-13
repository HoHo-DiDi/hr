<?php

namespace App\Http\Requests\Allowance;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAllowanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'designation_id' => ['required', 'array', 'min:1'],
            'designation_id.*' => ['required', 'integer', 'exists:designations,id'],
            'amount' => ['required', 'decimal:0,2', 'min:100'],
        ];
    }
}
