import { LeaveType } from "../types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface LeaveTypeActionMenuProps {
    leaveType: LeaveType;
    onEdit: (leaveType: LeaveType) => void;
    onDelete: (leaveType: LeaveType) => void;
}

export function LeaveTypeActionMenu({ leaveType, onEdit, onDelete }: LeaveTypeActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(leaveType)}>
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onSelect={() => onDelete(leaveType)}>
                    <Trash2 className="mr-1 h-4 w-4" />

                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
