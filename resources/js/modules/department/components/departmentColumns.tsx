import { ColumnDef } from '@tanstack/react-table';
import { DepartmentActionMenu } from './DepartmentActionMenu';
import { Department, DepartmentTableMeta } from '../type';
import TextCell from '@/components/common/text-cell';

export const departmentColumns: ColumnDef<Department>[] = [
    {
        accessorKey: 'no',
        header: 'No.',
        cell: ({ row }) => <div>{row.index + 1}.</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue }) => <TextCell value={getValue() as string} />
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const department = row.original;
            const meta = table.options.meta as DepartmentTableMeta | undefined;

            return <DepartmentActionMenu department={department} meta={meta} />;
        },
    },
];
