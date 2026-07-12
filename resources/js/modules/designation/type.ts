export interface Designation {
    id: number;
    name: string;
}

export interface DesignationTableMeta {
    onDelete: (designation: Designation) => void;
    onEdit: (designation: Designation) => void;
}
