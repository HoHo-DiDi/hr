<?php

namespace App\Models;

use App\Enums\EmploymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'e_code',
        'user_id',
        'avatar',
        'department_id',
        'designation_id',
        'employment_status',
        'salary',
        'joined_date',
        'resigned_date'
    ];

    protected $casts = [
        'joined_date' => 'date',
        'resigned_date' => 'date',
        'status' => EmploymentStatus::class
    ];

    public function emergencyContact(): HasOne
    {
        return $this->hasOne(EmergencyContact::class, 'employee_id');
    }
}
