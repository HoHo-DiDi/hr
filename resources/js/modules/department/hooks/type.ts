export type Department = {
    id: number;
    name: string;
};

export type DepartmentTableMeta = {
    onDelete: (deppartment: Department) => void;
};
