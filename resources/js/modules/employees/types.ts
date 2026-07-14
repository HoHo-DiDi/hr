import { Department } from '../department/type';
import { Designation } from '../designation/type';

export type Employee = {
    id: string;
    name: string;
    e_code: string;
    user_id: number;
    avatar: string | null;
    department_id: number;
    designation_id: number;
    employment_status: 'in_probation' | 'permanent' | 'resigned';
    salary: number;
    joined_date: string;
    resigned_date: string | null;
    designation: Designation;
    department: Department;
    emergencyContact: EmergencyContact | null;
};

export type EmergencyContact = {
    employee_id: number;
    name: string;
    relationship: string;
    phone: string;
};
