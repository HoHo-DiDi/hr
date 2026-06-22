import { useTransition } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    ColumnDef,
    TableMeta,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type SortingState,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
    ChevronUp,
} from 'lucide-react';
import { LaravelPagination } from '@/types';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    paginationData: LaravelPagination<TData>;
    meta?: TableMeta<TData>;
}

export function DataTable<TData, TValue>({
    columns,
    paginationData,
    meta,
}: DataTableProps<TData, TValue>) {
    const [isPending, startTransition] = useTransition();
    const { props } = usePage();

    // Map current URL search params to find existing sort rules
    const urlParams = new URLSearchParams(window.location.search);
    const currentSortField = urlParams.get('sort') || '';
    const currentSortDir =
        urlParams.get('direction') === 'desc' ? 'desc' : 'asc';

    const sorting: SortingState = currentSortField
        ? [{ id: currentSortField, desc: currentSortDir === 'desc' }]
        : [];

    const table = useReactTable({
        data: paginationData.data,
        columns,
        meta,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        state: {
            sorting,
        },
    });

    // Helper function to trigger Inertia server reloads
    const handleParamChange = (
        params: Record<string, string | number | null>,
    ) => {
        const currentUrl = new URL(window.location.href);

        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === '') {
                currentUrl.searchParams.delete(key);
            } else {
                currentUrl.searchParams.set(key, String(value));
            }
        });

        // Always reset to page 1 if changing page size or sorting rules
        if (!params.hasOwnProperty('page')) {
            currentUrl.searchParams.set('page', '1');
        }

        // Find the page prop key that holds our pagination data so Inertia
        // can update only that prop (avoids full page props replacement)
        const onlyOption: string[] | undefined = (() => {
            try {
                const pageProps = props as Record<string, any>;
                for (const key of Object.keys(pageProps)) {
                    const val = pageProps[key];
                    if (val === paginationData) return [key];
                    if (
                        val &&
                        typeof val === 'object' &&
                        'data' in val &&
                        val.data === paginationData.data
                    )
                        return [key];
                }
            } catch (e) {
                // fallback to undefined
            }
            return undefined;
        })();

        startTransition(() => {
            router.get(
                currentUrl.pathname,
                Object.fromEntries(currentUrl.searchParams.entries()),
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: onlyOption,
                },
            );
        });
    };

    return (
        <div
            className={`space-y-4 ${isPending ? 'pointer-events-none opacity-60 transition-opacity' : ''}`}
        >
            {/* Table Main Grid */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isSortable =
                                        header.column.getCanSort();
                                    const currentColumnSort = sorting.find(
                                        (s) => s.id === header.id,
                                    );

                                    const toggleSort = () => {
                                        if (!isSortable) return;
                                        let nextDir: string | null = 'asc';
                                        if (
                                            currentColumnSort &&
                                            !currentColumnSort.desc
                                        )
                                            nextDir = 'desc';
                                        else if (
                                            currentColumnSort &&
                                            currentColumnSort.desc
                                        )
                                            nextDir = null;

                                        handleParamChange({
                                            sort: nextDir ? header.id : null,
                                            direction: nextDir,
                                        });
                                    };

                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                isSortable
                                                    ? 'cursor-pointer select-none hover:bg-muted/50'
                                                    : ''
                                            }
                                            onClick={toggleSort}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                </span>
                                                {isSortable &&
                                                    currentColumnSort && (
                                                        <ChevronsUpDown
                                                            className={`h-4 w-4 transition-colors ${currentColumnSort.desc
                                                                    ? '[&>path:first-child]:text-muted-foreground/30 [&>path:last-child]:text-primary'
                                                                    : '[&>path:first-child]:text-primary [&>path:last-child]:text-muted-foreground/30'
                                                                } `}
                                                        />
                                                    )}
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Action Bar /}
                <div className="flex-1 text-sm text-muted-foreground">
                Showing {paginationData.from ?? 0} to {paginationData.to ?? 0} of {paginationData.total} entries
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                {/ Rows Per Page Selector */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={String(paginationData.per_page)}
                        onValueChange={(value) =>
                            handleParamChange({ per_page: value })
                        }
                    >
                        <SelectTrigger className="h-8 w-17.5">
                            <SelectValue
                                placeholder={String(paginationData.per_page)}
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handleParamChange({ page: 1 })}
                        disabled={paginationData.current_page === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                            handleParamChange({
                                page: paginationData.current_page - 1,
                            })
                        }
                        disabled={paginationData.current_page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="px-2 text-sm font-medium">
                        Page {paginationData.current_page} of{' '}
                        {paginationData.last_page}
                    </span>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                            handleParamChange({
                                page: paginationData.current_page + 1,
                            })
                        }
                        disabled={
                            paginationData.current_page ===
                            paginationData.last_page
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() =>
                            handleParamChange({
                                page: paginationData.last_page,
                            })
                        }
                        disabled={
                            paginationData.current_page ===
                            paginationData.last_page
                        }
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
