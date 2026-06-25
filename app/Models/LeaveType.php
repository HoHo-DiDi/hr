<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveType extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'symbol',
        'yearly_reset',
        'is_paid',
        'is_refundable',
        'description',
    ];

    public function leaveHistories(): HasMany
    {
        return $this->hasMany(LeaveHistory::class);
    }

    public function isInUse(): bool
    {
        return $this->leaveHistories()->exists();
    }
}
