import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Allowance, AllowanceTableMeta } from '../type';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EditAllowanceDialog from '@/pages/admin/allowance/EditAllowanceDialog';
import DeleteAllowanceDialog from '@/pages/admin/allowance/DeleteAllowanceDialog';

export function AllowanceActionMenu({
    allowance,
    meta,
}: {
    allowance: Allowance;
    meta: AllowanceTableMeta | undefined;
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

            <EditAllowanceDialog
                allowance={allowance}
                designations={meta?.designations ?? []}
                open={open}
                onOpenChange={setOpen}
            />

            <DeleteAllowanceDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onDelete={meta?.onDelete}
                allowance={allowance}
            />
        </>
    );
}
