<?php

namespace App\Services;

use App\Models\Designation;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DesignationService
{
    public function getData(array $filters)
    {
        $query = Designation::query();

        if (isset($filters['sort']) && $filters['sort'] == 'name') {
            $sort = $filters['sort'];
            $direction = (isset($filters['sort']) && $filters['sort'] === 'desc') ? 'desc' : 'asc';
            $query->orderBy($sort, $direction);
        } else {
            $query->latest();
        }
        if (isset($filters['search'])) {
            $query->where('name', 'like', "%{$filters['search']}%");
        }
        return $query->select('id', 'name')->paginate($filters['per_page'] ?? 10)->withQueryString();
    }

    public function store(string $name)
    {
        try {
            return DB::transaction(function () use ($name) {
                $designation = Designation::create(['name' => $name]);
                return $designation;
            });
        } catch (\Throwable $th) {
            Log::error('Fail to create designation: ' . $th->getMessage(), [
                'name' => $name,
                'trace' => $th->getTraceAsString()
            ]);
            throw new Exception('Unable to create designation at this time. Please try again.');
        }
    }

    public function update(Designation $designation, string $name)
    {
        try {
            return DB::transaction(function () use ($designation, $name) {
                $designation->update(['name' => $name]);
                return $designation;
            });
        } catch (\Throwable $th) {
            Log::error("Failed to update department: " . $th->getMessage());
            throw new Exception("Could not update designation. Please try again.");
        }
    }

    public function destroy(Designation $designation)
    {
        try {
            return DB::transaction(function () use ($designation) {
                return $designation->delete();
            });
        } catch (\Throwable $th) {
            Log::error("Failed to delete designation: " . $th->getMessage());
            throw new Exception("Could not delete designation. Please try again.");
        }
    }
}
