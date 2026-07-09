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
            ['name' => 'Wholesale Sales'],
            ['name' => 'Data Science'],
            ['name' => 'Legal Affairs'],
            ['name' => 'Innovation & Strategy'],
            ['name' => 'Customer Support'],
            ['name' => 'Treasury'],
            ['name' => 'Fleet Management'],
            ['name' => 'UI/UX Design'],
            ['name' => 'Marketing'],
            ['name' => 'Procurement & Purchasing'],
            ['name' => 'Audit & Compliance'],
            ['name' => 'Warehouse Operations'],
            ['name' => 'Public Relations'],
            ['name' => 'Human Resources'],
            ['name' => 'Sustainability & ESG'],
            ['name' => 'Engineering'],
            ['name' => 'Inside Sales'],
            ['name' => 'Facilities & Maintenance'],
            ['name' => 'Communications'],
            ['name' => 'Digital Marketing'],
            ['name' => 'Business Intelligence'],
            ['name' => 'Vendor Management'],
            ['name' => 'Risk Management'],
            ['name' => 'Government Relations'],
            ['name' => 'Quality Assurance (QA)'],
            ['name' => 'Talent Acquisition'],
            ['name' => 'Accounting'],
            ['name' => 'Web Development'],
            ['name' => 'Operations'],
            ['name' => 'Media Relations'],
            ['name' => 'International Business'],
            ['name' => 'Supply Chain'],
            ['name' => 'Infrastructure'],
            ['name' => 'Research & Development (R&D)'],
            ['name' => 'Security & Safety'],
            ['name' => 'Product Management'],
            ['name' => 'Merchandising'],
            ['name' => 'Inventory Control'],
            ['name' => 'Design & Creative'],
            ['name' => 'Training & Development'],
            ['name' => 'E-commerce'],
            ['name' => 'Sales'],
            ['name' => 'Administration'],
            ['name' => 'Customer Success'],
            ['name' => 'Logistics'],
            ['name' => 'Business Development'],
            ['name' => 'Advertising'],
            ['name' => 'Information Technology'],
            ['name' => 'Finance'],
            ['name' => 'Project Management Office (PMO)']
        ];

        Department::insert($departments);
    }
}
