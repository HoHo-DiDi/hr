<?php

namespace App\Services;

use App\Models\Department;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class DepartmentService
{
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
}
