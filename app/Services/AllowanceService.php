<?php

namespace App\Services;

use App\Models\Allowance;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AllowanceService
{
    public function createAllownace(string $name, array $designationIds, float|string $amount): Allowance
    {
        try {
            return DB::transaction(function () use ($name, $designationIds, $amount) {
                $allowance = Allowance::create([
                    'name' => $name,
                    'amount' => $amount
                ]);

                $allowance->designations()->attach($designationIds);

                return $allowance;
            });
        } catch (\Throwable $th) {
            Log::error('Failed to create allowance: ' . $th->getMessage(), [
                'name' => $name,
                'designation_ids' => $designationIds,
                'trace' => $th->getTraceAsString(),
            ]);

            throw new Exception('Unable to create allownace at this time. Please try again');
        }
    }
}
