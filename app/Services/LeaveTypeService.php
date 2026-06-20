<?php

namespace App\Services;

use App\Exceptions\LeaveTypeDeleteBlockedException;
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
                $q->where('name', "like", "%$search%")
                    ->orWhere('symbol', 'like', "%$search%")
                    ->orWhere('yearly_reset', 'like', "%$search%");
            });
        }

        $allowedSorts = [
            'name',
            'symbol',
            'is_paid',
            'is_refundable',
            'yearly_reset',
        ];

        $sortField = $filters['sort'] ?? null;
        $direction = ($filters['direction'] ?? 'asc') === 'asc' ? 'asc' : 'desc';

        if ($sortField && in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $direction);
        } else {
            $query->orderBy('id', 'desc');
        }
        return $query->select([
            'id',
            'name',
            'symbol',
            'is_paid',
            'is_refundable',
            'yearly_reset',
        ])->paginate($filters['per_page'] ?? 10)->withQueryString();
    }

    public function store(array $data): LeaveType
    {
        return DB::transaction(function () use ($data) {
            return LeaveType::create($data);
        });
    }

    public function update(array $data, LeaveType $leaveType): LeaveType
    {
        if ($leaveType->isInUse() && isset($data['symbol']) && $data['symbol'] !== $leaveType->symbol) {
            throw new LeaveTypeSymbolUpdateBlockedException();
        }
        return DB::transaction(function () use ($data, $leaveType) {
            $leaveType->update($data);
            return $leaveType->fresh();
        });
    }

    public function destroy(LeaveType $leaveType): void
    {
        if ($leaveType->isInUse()) {
            throw new LeaveTypeDeleteBlockedException();
        }
        DB::transaction(function () use ($leaveType) {
            $leaveType->delete();
        });
    }
}
