import { Designation } from '@/modules/designation/type';
import { Head, router } from '@inertiajs/react';
import CreateDesignationDialog from './CreateDesignationDialog';
import { DataTable } from '@/components/Datatable';
import { designationColumns } from '@/modules/designation/components/designationColumns';
import designations, { destroy } from '@/routes/designations';
import { useEffect, useState } from 'react';

interface DesignationPaginator {
    data: Designation[];
    current_page: number;
    per_page: number;
    [key: string]: any;
}

interface Props {
    designations: DesignationPaginator;
}

const DesignationPage = ({ designations }: Props) => {
    const [pagination, setPagination] = useState({
        pageIndex: Math.max(designations.current_page - 1, 0),
        pageSize: designations.per_page,
    });

    useEffect(() => {
        setPagination({
            pageIndex: Math.max(designations.current_page - 1, 0),
            pageSize: designations.per_page,
        });
    }, [designations.current_page, designations.per_page]);

    const pageCount = designations.last_page;

    return (
        <>
            <Head title="Allowances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Designations
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your designations.
                        </p>
                    </div>
                    <CreateDesignationDialog />
                </div>

                <div>
                    <DataTable
                        columns={designationColumns}
                        data={designations.data}
                        meta={{
                            onDelete: (designation: Designation) => {
                                router.delete(destroy(designation.id).url);
                            },
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

DesignationPage.layout = {
    breadcrumbs: [
        {
            title: 'Departments',
            href: designations.index.url(),
        },
    ],
};

export default DesignationPage;
