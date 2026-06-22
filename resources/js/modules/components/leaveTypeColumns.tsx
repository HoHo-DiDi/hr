
import TextCell from "@/components/common/text-cell";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { LeaveType } from "../types";
import ToggleBadgeCell from "@/components/common/toggle-badge";

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
];