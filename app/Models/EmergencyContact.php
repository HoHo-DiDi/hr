<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EmergencyContact extends Model
{
    protected $fillable = [
        'employee_id',
        'name',
        'relationship',
        'phone',
    ];

    public function employee(): HasOne
    {
        return $this->hasOne(Employee::class, 'employee_id');
    }
}
