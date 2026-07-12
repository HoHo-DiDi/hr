import { Designation } from '@/modules/designation/type';

export interface Allowance {
    id: number;
    name: string;
    amount: number;
    designations: Designation[];
}

export type AllowanceTableMeta = {
    onDelete: (allowance: Allowance) => void;
    onEdit: (allowance: Allowance) => void;
    designations: Designation[];
};
