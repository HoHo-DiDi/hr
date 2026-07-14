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
        if (isset($filters['search'])) {
            $searchValue = trim($filters['search']);
            $query->where(function ($subQuery) use ($searchValue) {
                $subQuery->where('name', 'like', "%{$searchValue}%")
                    ->orWhere('e_code', 'like', "%{$searchValue}%");
            });
        }
        $allowedSorts = ['name', 'e_code', 'salary', 'joined_date'];
        if (isset($filters['sort'])) {
            $sortField = $filters['sort'];
            if (in_array($sortField, $allowedSorts)) {
                $direction = ($filters['direction'] ?? 'asc') == 'asc' ? 'asc' : 'desc';
                $query->orderBy($sortField, $direction);
            }
        } else {
            $query->latest();
        }
        return $query
            ->select([
                'id',
                'name',
                'e_code',
                'avatar',
                'department_id',
                'designation_id',
                'employment_status',
                'salary',
                'joined_date',
            ])
            ->with(['department:id,name', 'designation:id,name'])
            ->paginate($filters['per_page'] ?? 10)
            ->withQueryString();
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
