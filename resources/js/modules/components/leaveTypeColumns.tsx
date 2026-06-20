import BagdeCell from "@/components/common/badge-cell";
import TextCell from "@/components/common/text-cell";
import { Badge } from "@/components/ui/badge";
import { LeaveType } from "@/types/leave-type";
import { ColumnDef } from "@tanstack/react-table";

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
        cell: ({ getValue }) => <BagdeCell value={getValue() as boolean} />
    },
    {
        accessorKey: "is_refundable",
        header: "Refundable",
        cell: ({ getValue }) => <BagdeCell value={getValue() as boolean} />
    },
    {
        accessorKey: "yearly_reset",
        header: "Yearly Reset",
        cell: ({ getValue }) => <TextCell value={getValue() as number} />
    },
];