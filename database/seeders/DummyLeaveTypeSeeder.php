<?php

namespace Database\Seeders;

use App\Models\LeaveType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DummyLeaveTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $leaveTypes = [
            [
                'name' => 'Annual Leave',
                'yearly_reset' => 10,
                'symbol' => 'AL',
                'is_paid' => true,
                'is_refundable' => true,
                'description' => 'Paid time off granted to employees for vacation and personal use.'
            ],
            [
                'name' => 'Sick Leave',
                'yearly_reset' => 10,
                'symbol' => 'SL',
                'is_paid' => true,
                'is_refundable' => false,
                'description' => 'Paid leave for recovery from illness or medical appointments.'
            ],
            [
                'name' => 'Casual Leave',
                'yearly_reset' => 6,
                'symbol' => 'CL',
                'is_paid' => true,
                'is_refundable' => false,
                'description' => 'Short-term leave for urgent personal matters or unforeseen events.'
            ],
            [
                'name' => 'Maternity Leave',
                'yearly_reset' => 90,
                'symbol' => 'ML',
                'is_paid' => true,
                'is_refundable' => false,
                'description' => 'Paid leave for female employees before and after childbirth.'
            ],
            [
                'name' => 'Paternity Leave',
                'yearly_reset' => 10,
                'symbol' => 'PL',
                'is_paid' => true,
                'is_refundable' => false,
                'description' => 'Paid leave for male employees following the birth of a child.'
            ],
            [
                'name' => 'Unpaid Leave',
                'yearly_reset' => 0,
                'symbol' => 'UL',
                'is_paid' => false,
                'is_refundable' => false,
                'description' => 'Time off without pay, approved when paid leave balances are exhausted.'
            ]
        ];

        LeaveType::insert($leaveTypes);
    }
}
