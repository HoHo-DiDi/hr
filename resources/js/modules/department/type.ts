export type Department = {
    id: number;
    name: string;
};

export type DepartmentTableMeta = {
    onDelete: (department: Department) => void;
    onEdit: (department: Department) => void;
};
