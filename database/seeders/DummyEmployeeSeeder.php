<?php

namespace Database\Seeders;

use App\Enums\EmploymentStatus;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DummyEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'name' => 'Ahmad Faiz bin Rahman',
                'e_code' => 'EMP-0001',
                'user_id' => 1,
                'avatar' => null,
                'department_id' => 1,
                'designation_id' => 1,
                'employment_status' => EmploymentStatus::PERMANENT->value,
                'salary' => 5500.00,
                'joined_date' => '2021-03-15',
                'resigned_date' => null,
            ],
            [
                'name' => 'Nur Aisyah binti Ismail',
                'e_code' => 'EMP-0002',
                'user_id' => 2,
                'avatar' => null,
                'department_id' => 2,
                'designation_id' => 3,
                'employment_status' => EmploymentStatus::PERMANENT->value,
                'salary' => 4800.00,
                'joined_date' => '2022-01-10',
                'resigned_date' => null,
            ],
            [
                'name' => 'Kevin Tan Wei Ming',
                'e_code' => 'EMP-0003',
                'user_id' => 3,
                'avatar' => null,
                'department_id' => 1,
                'designation_id' => 2,
                'employment_status' => EmploymentStatus::IN_PROBATION->value,
                'salary' => 3200.00,
                'joined_date' => '2025-05-01',
                'resigned_date' => null,
            ],
            [
                'name' => 'Siti Nurhaliza binti Kassim',
                'e_code' => 'EMP-0004',
                'user_id' => 4,
                'avatar' => null,
                'department_id' => 3,
                'designation_id' => 4,
                'employment_status' => EmploymentStatus::RESIGNED->value,
                'salary' => 4200.00,
                'joined_date' => '2020-06-20',
                'resigned_date' => '2024-11-30',
            ],
            [
                'name' => 'Ravi Kumar a/l Suresh',
                'e_code' => 'EMP-0005',
                'user_id' => 5,
                'avatar' => null,
                'department_id' => 2,
                'designation_id' => 1,
                'employment_status' => EmploymentStatus::PERMANENT->value,
                'salary' => 6100.00,
                'joined_date' => '2019-09-05',
                'resigned_date' => null,
            ],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
