<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DummyDepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            ['name' => 'Human Resources'],
            ['name' => 'Finance'],
            ['name' => 'Sales'],
            ['name' => 'Marketing'],
            ['name' => 'Information Technology'],
        ];

        Department::insert($departments);
    }
}
