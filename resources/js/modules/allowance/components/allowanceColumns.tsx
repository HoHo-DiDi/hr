import { ColumnDef } from '@tanstack/react-table';
import { Allowance, AllowanceTableMeta } from '../type';
import { Badge } from '@/components/ui/badge';
import { Designation } from '@/modules/designation/type';
import { AllowanceActionMenu } from './AllowanceActionMenu';

export const allowanceColumns: ColumnDef<Allowance>[] = [
    {
        accessorKey: 'no',
        header: 'No.',
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'designations',
        header: 'Designations',
        cell: ({ getValue }) => {
            const designations = (getValue() as Designation[]) ?? [];
            return (
                <div className="flex flex-wrap gap-1">
                    {designations.map((designation) => (
                        <Badge key={designation.id} variant="default">
                            {designation.name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ getValue }) => {
            const amount = getValue<number>();
            return <div>{amount?.toLocaleString() ?? 0} MMK</div>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const allowance = row.original;
            const meta = table.options.meta as AllowanceTableMeta | undefined;

            return <AllowanceActionMenu allowance={allowance} meta={meta} />;
        },
    },
];
