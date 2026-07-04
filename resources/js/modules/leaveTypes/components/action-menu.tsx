import { LeaveType } from "../types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";

interface LeaveTypeActionMenuProps {
    leaveType: LeaveType;
    onEdit: (leaveType: LeaveType) => void;
    onDelete: (leaveType: LeaveType) => void;
}

export function LeaveTypeActionMenu({ leaveType, onEdit, onDelete }: LeaveTypeActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Open actions menu">
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(leaveType)}>
                    <PencilIcon />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" variant="destructive" onSelect={() => onDelete(leaveType)}>
                    <Trash2Icon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
