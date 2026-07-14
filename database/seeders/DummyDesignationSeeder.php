<?php

namespace Database\Seeders;

use App\Models\Designation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DummyDesignationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $designations = [
            ['name' => 'Manager'],
            ['name' => 'Executive'],
            ['name' => 'Supervisor'],
            ['name' => 'Officer'],
            ['name' => 'Assistant'],
        ];

        Designation::insert($designations);
    }
}
