<?php

namespace App\Services;

use App\Exceptions\LeaveTypeDeleteBlockedException;
use App\Exceptions\LeaveTypeSymbolUpdateBlockedException;
use App\Models\LeaveType;
use Illuminate\Support\Facades\DB;

class LeaveTypeService
{
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
