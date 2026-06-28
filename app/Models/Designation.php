<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Designation extends Model
{
    protected $fillable = ['name'];

    public function allowances()
    {
        return $this->belongsToMany(Allowance::class, 'designation_allowances');
    }
}
