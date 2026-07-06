<?php

namespace App\Services;

use App\Models\Department;
use App\Exceptions\ServiceException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class DepartmentService
{
    public function getData(array $filters)
    {
        $query = Department::query();

        if (isset($filters['sort']) && $filters['sort'] == 'name') {
            $sort = $filters['sort'];
            $direction = $filters['direction'] === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sort, $direction);
        } else {
            $query->latest();
        }
        if (isset($filters['search'])) {
            $query->where('name', 'like', "%{$filters['search']}%");
        }
        return $query->select('id', 'name')->paginate($filters['per_page'] ?? 10)->withQueryString();
    }

    public function createDepartment(string $name)
    {
        try {
            return DB::transaction(function () use ($name) {
                $department = Department::create(['name' => $name]);
                return $department;
            });
        } catch (\Throwable $th) {
            Log::error('Fail to create department: ' . $th->getMessage(), [
                'name' => $name,
                'trace' => $th->getTraceAsString()
            ]);
            throw new Exception('Unable to create department at this time. Please try again.');
        }
    }

    public function updateDepartment(Department $department, string $name)
    {
        try {
            return DB::transaction(function () use ($department, $name) {
                $department->update(['name' => $name]);
                return $department;
            });
        } catch (\Throwable $th) {
            Log::error("Failed to update department: " . $th->getMessage());
            throw new Exception("Could not update department. Please try again.");
        }
    }
}
