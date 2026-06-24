<?php

namespace App\Services;

use App\Models\Designation;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DesignationService
{
    public function createDesignation(string $name)
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

    public function updateDesignation(Designation $designation, string $name)
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
}
