import { useState } from 'react';
import { Designation, DesignationTableMeta } from '../type';
import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export function DesignationActionMenu({
    designation,
    meta,
}: {
    designation: Designation;
    meta: DesignationTableMeta | undefined;
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
                    <DropdownMenuItem onClick={() => meta?.onEdit(designation)}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    {meta?.onDelete && (
                        <DropdownMenuItem
                            onClick={() => meta?.onDelete(designation)}
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
