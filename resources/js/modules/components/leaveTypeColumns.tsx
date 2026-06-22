
import TextCell from "@/components/common/text-cell";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { LeaveType } from "../types";
import ToggleBadgeCell from "@/components/common/toggle-badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

export const leaveTypeColumns: ColumnDef<LeaveType>[] = [
    {
        header: "No",
        cell: ({ row }) => row.index + 1
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ getValue }) => <TextCell value={getValue() as string} />
    },
    {
        accessorKey: "symbol",
        header: "Symbol",
        cell: ({ getValue }) => <TextCell value={getValue() as string} />
    },
    {
        accessorKey: "is_paid",
        header: "Paid",
        cell: ({ getValue }) => <ToggleBadgeCell value={getValue() as boolean} />
    },
    {
        accessorKey: "is_refundable",
        header: "Refundable",
        cell: ({ getValue }) => <ToggleBadgeCell value={getValue() as boolean} />
    },
    {
        accessorKey: "yearly_reset",
        header: "Yearly Reset",
        cell: ({ getValue }) => <TextCell value={getValue() as number} />
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const leaveType = row.original;
            const meta = table.options.meta as any;

            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => meta?.onEdit?.(leaveType)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => meta?.onDelete?.(leaveType)}
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];