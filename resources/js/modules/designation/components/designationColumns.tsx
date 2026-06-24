import { ColumnDef } from '@tanstack/react-table';
import { Designation, DesignationTableMeta } from '../type';
import { DesignationActionMenu } from './DesignationActionMenu';

export const designationColumns: ColumnDef<Designation>[] = [
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
        id: 'actions',
        header: 'Actions',
        cell: ({ row, table }) => {
            const designation = row.original;
            const meta = table.options.meta as DesignationTableMeta | undefined;

            return (
                <DesignationActionMenu designation={designation} meta={meta} />
            );
        },
    },
];
