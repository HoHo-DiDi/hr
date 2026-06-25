<?php

namespace App\Services;

use App\Exceptions\LeaveTypeSymbolUpdateBlockedException;
use App\Models\LeaveType;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class LeaveTypeService
{
    public function getData(array $filters): LengthAwarePaginator
    {
        $query = LeaveType::query();
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('symbol', 'like', "%$search%")
                    ->orWhere('yearly_reset', $search);
            });
        }

        $allowedSorts = [
            'name',
            'symbol',
            'is_paid',
            'is_refundable',
            'yearly_reset',
        ];
        $sortField = $filters['sorting'] ?? null;
        $direction = ($filters['direction'] ?? 'asc') === 'asc' ? 'asc' : 'desc';
        if ($sortField && in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($filters['per_page'] ?? 10)->withQueryString();
    }

    public function store(array $data): LeaveType
    {
        return DB::transaction(function () use ($data) {
            return LeaveType::create($data);
        });
    }

    public function update(array $data, LeaveType $leaveType)
    {
        return DB::transaction(function () use ($data, $leaveType) {
            if ($leaveType->isInUse() && $data['symbol'] != $leaveType->symbol) {
                throw new LeaveTypeSymbolUpdateBlockedException;
            }
            return $leaveType->update($data);
        });
    }

    public function destroy(LeaveType $leaveType)
    {
        return DB::transaction(function () use ($leaveType) {
            return $leaveType->delete();
        });
    }
}
