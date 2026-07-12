<?php

namespace App\Services;

use App\Models\Allowance;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AllowanceService
{
    public function getAllowances(array $filters): LengthAwarePaginator
    {
        $query = Allowance::query();

        if (isset($filters['search'])) {
            $search = $filters['search'];

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhereHas('designations', function ($q) use ($search) {
                        $q->where('name', 'like', "%$search%");
                    });
                if (is_numeric($search) || preg_match('/[0-9]/', $search)) {
                    $q->orWhereRaw('CAST(amount AS CHAR) LIKE ?', ["%$search%"]);
                }
            });
        }

        if (isset($filters['sort'])) {
            $allowedSorts = [
                'name',
                'amount'
            ];
            $sortField = $filters['sort'];

            $direction = (isset($filters['direction']) &&
                $filters['direction'] === 'desc') ? 'desc' : 'asc';
            if (in_array($sortField, $allowedSorts)) {
                $query->orderBy($sortField, $direction);
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->with('designations:id,name')->paginate($filters['per_page'] ?? 10)->withQueryString();
    }
    public function store(array $data): Allowance
    {
        try {
            return DB::transaction(function () use ($data) {
                $allowance = Allowance::create([
                    'name' => $data['name'],
                    'amount' => $data['amount']
                ]);
                $designationIds = $data['designation_id'] ?? [];
                $allowance->designations()->attach($designationIds);

                return $allowance;
            });
        } catch (\Throwable $th) {
            Log::error('Failed to create allowance: ' . $th->getMessage(), [
                'payload' => $data,
                'trace' => $th->getTraceAsString(),
            ]);

            throw new Exception('Unable to create allowance at this time. Please try again');
        }
    }

    public function update(array $data, Allowance $allowance): Allowance
    {
        try {
            return DB::transaction(function () use ($allowance, $data) {
                $allowance->update([
                    'name' => $data['name'],
                    'amount' => $data['amount']
                ]);
                $designationIds = $data['designation_id'] ?? [];
                $allowance->designations()->sync($designationIds);

                return $allowance;
            });
        } catch (\Throwable $th) {
            Log::error('Failed to update allowance: ' . $th->getMessage(), [
                'payload' => $data,
                'trace' => $th->getTraceAsString(),
            ]);

            throw new Exception('Unable to update allowance at this time. Please try again');
        }
    }

    public function destroy(Allowance $allowance)
    {
        return DB::transaction(function () use ($allowance) {
            return $allowance->delete();
        });
    }
}
