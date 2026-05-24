import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Department, DepartmentTableMeta } from '../hooks/type';
import EditDepartmentDialog from '@/pages/admin/department/EditDepartmentDialog';
import { useState } from 'react';
import DeleteDepartmentDialog from '@/pages/admin/department/DeleteDepartmentDialog';

export function DepartmentActionMenu({
    department,
    meta,
}: {
    department: Department;
    meta: DepartmentTableMeta | undefined;
}) {
    const [open, setOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    {meta?.onDelete && (
                        <DropdownMenuItem
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="text-red-600"
                        >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDepartmentDialog
                department={department}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onDelete={meta?.onDelete}
            />

            <EditDepartmentDialog
                id={department.id}
                name={department.name}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
