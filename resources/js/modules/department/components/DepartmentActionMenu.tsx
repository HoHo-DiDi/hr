import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Department, DepartmentTableMeta } from '../type';

export function DepartmentActionMenu({
    department,
    meta,
}: {
    department: Department;
    meta: DepartmentTableMeta | undefined;
}) {

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
                    <DropdownMenuItem onClick={() => meta?.onEdit(department)}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    {meta?.onDelete && (
                        <DropdownMenuItem
                            onClick={() => meta.onDelete(department)}
                            className="text-red-600"
                        >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
