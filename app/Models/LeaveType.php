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
        'yearly_reset',
        'symbol',
        'is_paid',
        'is_refundable',
        'description'
    ];

    protected $casts = [
        'is_paid' => 'boolean',
        'is_refundable' => 'boolean',
    ];

    public function leaveHistories(): HasMany
    {
        return $this->hasMany(LeaveHistory::class, 'leave_type_id');
    }

    public function isInUse(): bool
    {
        return $this->leaveHistories()->exists();
    }
}
