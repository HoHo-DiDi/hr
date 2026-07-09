<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
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
            'e_code' => ['required', 'string', "unique:employees,e_code,except,{$this->route('employee')}"],
            'department_id' => ['required', 'exists:departmentss,id'],
            'designation_id' => ['required', 'exists:designations,id'],
            'salary' => ['required', 'integer', 'min:0']
        ];
    }
}
