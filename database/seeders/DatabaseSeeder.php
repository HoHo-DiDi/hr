<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password')
        ]);

        $departments = [
            ['name' => 'Accounting'],
            ['name' => 'Administration'],
            ['name' => 'Advertising'],
            ['name' => 'Audit & Compliance'],
            ['name' => 'Business Development'],
            ['name' => 'Business Intelligence'],
            ['name' => 'Communications'],
            ['name' => 'Customer Success'],
            ['name' => 'Customer Support'],
            ['name' => 'Data Science'],
            ['name' => 'Design & Creative'],
            ['name' => 'Digital Marketing'],
            ['name' => 'E-commerce'],
            ['name' => 'Engineering'],
            ['name' => 'Facilities & Maintenance'],
            ['name' => 'Finance'],
            ['name' => 'Fleet Management'],
            ['name' => 'Government Relations'],
            ['name' => 'Human Resources'],
            ['name' => 'Information Technology'],
            ['name' => 'Infrastructure'],
            ['name' => 'Innovation & Strategy'],
            ['name' => 'Inside Sales'],
            ['name' => 'International Business'],
            ['name' => 'Inventory Control'],
            ['name' => 'Legal Affairs'],
            ['name' => 'Logistics'],
            ['name' => 'Marketing'],
            ['name' => 'Media Relations'],
            ['name' => 'Merchandising'],
            ['name' => 'Operations'],
            ['name' => 'Procurement & Purchasing'],
            ['name' => 'Product Management'],
            ['name' => 'Project Management Office (PMO)'],
            ['name' => 'Public Relations'],
            ['name' => 'Quality Assurance (QA)'],
            ['name' => 'Research & Development (R&D)'],
            ['name' => 'Risk Management'],
            ['name' => 'Sales'],
            ['name' => 'Security & Safety'],
            ['name' => 'Supply Chain'],
            ['name' => 'Sustainability & ESG'],
            ['name' => 'Talent Acquisition'],
            ['name' => 'Training & Development'],
            ['name' => 'Treasury'],
            ['name' => 'UI/UX Design'],
            ['name' => 'Vendor Management'],
            ['name' => 'Warehouse Operations'],
            ['name' => 'Web Development'],
            ['name' => 'Wholesale Sales']
        ];

        Department::insert($departments);
    }
}
