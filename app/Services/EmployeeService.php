<?php

namespace App\Services;

use App\Models\Employee;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class EmployeeService
{
    public function getData(array $filters): LengthAwarePaginator
    {
        $query = Employee::query();
        $allowedSorts = ['name', 'e_code', 'salary'];
        return $query->paginate($filters['per_page'] ?? 10)->withQueryString();
    }

    public function store(array $data): Employee
    {
        return DB::transaction(function () use ($data) {});
    }

    public function update(Employee $employee, array $data): Employee
    {
        return DB::transaction(function () use ($employee, $data) {});
    }

    public function destroy(Employee $employee): Employee
    {
        return DB::transaction(function () use ($employee) {});
    }
}
