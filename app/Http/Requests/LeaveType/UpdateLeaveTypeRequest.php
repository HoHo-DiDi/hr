<?php

namespace App\Http\Requests\LeaveType;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLeaveTypeRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'symbol' => ['required', 'string', Rule::unique('leave_types', 'symbol')->ignore($this->route('leave_type'))],
            'yearly_reset' => ['required', 'numeric', 'min:0'],
            'is_paid' => ['required', 'boolean'],
            'is_refundable' => ['required', 'boolean'],
            'description' => ['nullable', 'string'],
        ];
    }
}
