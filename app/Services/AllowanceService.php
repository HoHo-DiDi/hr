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

            throw new Exception('Unable to create allowance at this time. Please try again');
        }
    }

    public function updateAllowance(Allowance $allowance, array $data): Allowance
    {
        try {
            return DB::transaction(function () use ($allowance, $data) {
                $allowance->update([
                    'name' => $data['name'],
                    'amount' => $data['amount']
                ]);

                $allowance->designations()->sync($data['designation_id']);

                return $allowance;
            });
        } catch (\Throwable $th) {
            Log::error('Failed to update allowance: ' . $th->getMessage(), [
                'name' => $data['name'],

                'designation_ids' => $data['designation_id'] ?? null,
                'trace' => $th->getTraceAsString(),
            ]);

            throw new Exception('Unable to update allowance at this time. Please try again');
        }
    }
}
