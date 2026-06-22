<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
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
            'name' => ['string', 'required', 'max:50'],
            'symbol' => ['required',  'string', Rule::unique('leave_types', 'symbol')->ignore($this->route('leave_type'))],
            'yearly_reset' => ['required', 'min:0', 'numeric'],
            'is_paid' => ['required', 'boolean'],
            'is_refundable' => ['required', 'boolean'],
            'description' => ['nullable', 'string']
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter the leave type name.',
            'name.string' => 'The leave type name must be a valid text.',
            'name.max' => 'The leave type name cannot exceed 50 characters.',

            'symbol.required' => 'Please enter the leave type symbol.',
            'symbol.string' => 'The leave type symbol must be a valid text.',
            'symbol.unique' => 'This symbol is already used. Please choose another one.',

            'yearly_reset.required' => 'Please enter the yearly reset value.',
            'yearly_reset.numeric' => 'The yearly reset value must be a number.',
            'yearly_reset.min' => 'The yearly reset value cannot be less than 0.',

            'is_paid.required' => 'Please specify whether this leave type is paid.',
            'is_paid.boolean' => 'The paid field must be true or false.',

            'is_refundable.required' => 'Please specify whether this leave type is refundable.',
            'is_refundable.boolean' => 'The refundable field must be true or false.',

            'description.string' => 'The description must be valid text.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'leave type name',
            'symbol' => 'leave type symbol',
            'yearly_reset' => 'yearly reset count',
            'is_paid' => 'paid status',
            'is_refundable' => 'refund status',
            'description' => 'description',
        ];
    }
}
