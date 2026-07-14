<?php

namespace Database\Seeders;

use App\Enums\EmploymentStatus;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class DummyEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = [
            [
                'user' => [
                    'name' => 'Aung Aung',
                    'email' => 'aungaung@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP001',
                    'avatar' => null,
                    'phone' => '+959 951 234 567',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 800000,
                    'joined_date' => '2022-01-10',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Kyaw Kyaw',
                    'email' => 'kyawkyaw@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP002',
                    'avatar' => null,
                    'phone' => '+959 972 345 678',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 950000,
                    'joined_date' => '2022-05-15',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Min Thu',
                    'email' => 'minthu@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP003',
                    'avatar' => null,
                    'phone' => '+959 963 456 789',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::IN_PROBATION,
                    'salary' => 700000,
                    'joined_date' => '2025-02-01',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ye Lin',
                    'email' => 'yelin@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP004',
                    'avatar' => null,
                    'phone' => '+959 940 567 891',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 1200000,
                    'joined_date' => '2021-08-20',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Ko Ko',
                    'email' => 'koko@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP005',
                    'avatar' => null,
                    'phone' => '+959 958 678 912',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 900000,
                    'joined_date' => '2023-03-12',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Zaw Min',
                    'email' => 'zawmin@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP006',
                    'avatar' => null,
                    'phone' => '+959 979 789 123',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 1300000,
                    'joined_date' => '2020-11-05',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Htet Aung',
                    'email' => 'htetaung@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP007',
                    'avatar' => null,
                    'phone' => '+959 966 891 234',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::IN_PROBATION,
                    'salary' => 750000,
                    'joined_date' => '2025-04-01',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Soe Moe',
                    'email' => 'soemoe@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP008',
                    'avatar' => null,
                    'phone' => '+959 943 912 345',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 1000000,
                    'joined_date' => '2021-01-18',
                    'resigned_date' => null,
                ],
            ],
            [
                'user' => [
                    'name' => 'Nay Lin',
                    'email' => 'naylin@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP009',
                    'avatar' => null,
                    'phone' => '+959 950 123 456',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::RESIGNED,
                    'salary' => 1100000,
                    'joined_date' => '2019-09-10',
                    'resigned_date' => '2025-06-30',
                ],
            ],
            [
                'user' => [
                    'name' => 'Thiha Win',
                    'email' => 'thihawin@example.com',
                    'password' => bcrypt('password'),
                ],
                'employee' => [
                    'e_code' => 'EMP010',
                    'avatar' => null,
                    'phone' => '+959 971 234 567',
                    'department_id' => rand(1, 5),
                    'designation_id' => rand(1, 5),
                    'employment_status' => EmploymentStatus::PERMANENT,
                    'salary' => 1400000,
                    'joined_date' => '2018-07-01',
                    'resigned_date' => null,
                ],
            ],
        ];
        $employees = [];
        foreach ($data as $item) {
            $user = User::create($item['user']);
            $employees[] = [
                'user_id' => $user->id,
                'name' => $user->name,
                ...$item['employee']
            ];
        }
        Employee::insert($employees);
    }
}
