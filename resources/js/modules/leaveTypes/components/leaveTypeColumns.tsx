import { ColumnDef } from "@tanstack/react-table";
import { LeaveType, TableMeta } from "../types";
import TextCell from "@/components/common/text-cell";
import ToggleBadgeCell from "@/components/common/toggle-badge";
import { LeaveTypeActionMenu } from "./LeaveTypeActionMenu";

export const leaveTypeColumns: ColumnDef<LeaveType>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue }) => <TextCell value={getValue() as string} />
    },
    {
        accessorKey: 'symbol',
        header: 'Symbol',
        cell: ({ getValue }) => <TextCell value={getValue() as string} />
    },
    {
        accessorKey: 'yearly_reset',
        header: 'Yearly Reset (days)',
        cell: ({ getValue }) => <TextCell value={getValue() as number} />
    },
    {
        accessorKey: 'is_paid',
        header: 'Paid',
        cell: ({ getValue }) => <ToggleBadgeCell value={getValue() as boolean} />
    },
    {
        accessorKey: 'is_refundable',
        header: 'Refundable',
        cell: ({ getValue }) => <ToggleBadgeCell value={getValue() as boolean} />
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row, table }) => {
            const { onEdit, onDelete } = table.options.meta as TableMeta;
            return (
                <LeaveTypeActionMenu
                    leaveType={row.original}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            );
        },
    },
];