<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveHistory extends Model
{
    protected $fillable = [
        'employee_id',
        'leave_type_id',
        'date'
    ];

    protected $casts = [
        'date' => 'date'
    ];
}
