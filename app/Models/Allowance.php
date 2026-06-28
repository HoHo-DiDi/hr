<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Allowance extends Model
{
    protected $fillable = ['name', 'amount'];

    public function designations()
    {
        return $this->belongsToMany(Designation::class, 'designation_allowances');
    }
}
