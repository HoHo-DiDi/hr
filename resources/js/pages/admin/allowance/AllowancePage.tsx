import { Head, router } from '@inertiajs/react';
import { Allowance } from '@/modules/allowance/type';
import CreateAllowanceDialog from './CreateAllowanceDialog';
import { Designation } from '@/modules/designation/type';
import { allowanceColumns } from '@/modules/allowance/components/allowanceColumns';
import allowances, { destroy } from '@/routes/allowances';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/data-table';

interface AllowancePaginator {
    data: Allowance[];
    current_page: number;
    per_page: number;
    [key: string]: any;
}

interface PageProps {
    allowances: AllowancePaginator;
    designations: Designation[];
}

const AllowancePage = ({ allowances, designations }: PageProps) => {
    const [pagination, setPagination] = useState({
        pageIndex: Math.max(allowances.current_page - 1, 0),
        pageSize: allowances.per_page,
    });

    useEffect(() => {
        setPagination({
            pageIndex: Math.max(allowances.current_page - 1, 0),
            pageSize: allowances.per_page,
        });
    }, [allowances.current_page, allowances.per_page]);

    const pageCount = allowances.last_page;
    return (
        <>
            <Head title="Allowances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Allowances
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your allowances.
                        </p>
                    </div>
                    <CreateAllowanceDialog designations={designations} />
                </div>

                <div>
                    <DataTable
                        columns={allowanceColumns}
                        data={allowances.data}
                        meta={{
                            onDelete: (allowance: Allowance) => {
                                router.delete(destroy(allowance.id).url);
                            },
                            designations,
                        }}
                        pageCount={pageCount}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            </div>
        </>
    );
};

AllowancePage.layout = {
    breadcrumbs: [
        {
            title: 'Allowances',
            href: allowances.index.url(),
        },
    ],
};

export default AllowancePage;
