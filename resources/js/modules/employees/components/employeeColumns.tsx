import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "../types";
import TextCell from "@/components/common/text-cell";
import ImageCell from "@/components/common/image-cell";
import DateCell from "@/components/common/date-cell";

export const employeeColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: 'index',
        header: "No",
        cell: ({ row }) => <TextCell value={row.index} />
    },
    {
        accessorKey: 'avatar',
        header: "Avatar",
        cell: ({ row }) => <ImageCell imageUrl={row.original.avatar} altText={row.original.name + " profile image"} />,
        enableSorting: false
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue }) => <TextCell value={getValue<string>()} />
    },
    {
        accessorKey: 'e_code',
        header: 'E-Code',
        cell: ({ getValue }) => <TextCell value={getValue<string>()} />
    },
    {
        id: 'department',
        accessorFn: (row) => row?.department.name,
        header: "Department",
        cell: ({ getValue }) => <TextCell value={getValue<string>()} />
    },
    {
        id: 'designation',
        accessorFn: (row) => row?.designation.name,
        header: "Designation",
        cell: ({ getValue }) => <TextCell value={getValue<string>()} />
    },
    {
        accessorKey: 'employment_status',
        header: 'Status',
        cell: ({ getValue }) => <TextCell value={getValue<string>()} />
    },
    {
        accessorKey: 'joined_date',
        header: 'Joined Date',
        cell: ({ getValue }) => <DateCell value={getValue<string>()} />
    }
];