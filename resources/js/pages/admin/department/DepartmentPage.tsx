import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CreateDepartmentDialog from './CreateDepartmentDialog';
import { DataTable } from '@/components/Datatable';
import { departmentColumns } from '../../../modules/department/components/departmentColumns';
import { Department } from '@/modules/department/type';
import departments, { destroy } from '@/routes/departments';

interface DepartmentPaginator {
    data: Department[];
    current_page: number;
    per_page: number;
    [key: string]: any;
}

interface PageProps {
    departments: DepartmentPaginator;
}

const DepartmentPage = ({ departments }: PageProps) => {
    const [pagination, setPagination] = useState({
        pageIndex: Math.max(departments.current_page - 1, 0),
        pageSize: departments.per_page,
    });

    useEffect(() => {
        setPagination({
            pageIndex: Math.max(departments.current_page - 1, 0),
            pageSize: departments.per_page,
        });
    }, [departments.current_page, departments.per_page]);

    const pageCount = departments.last_page;

    return (
        <>
            <Head title="Departments" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Departments
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your departments.
                        </p>
                    </div>
                    <CreateDepartmentDialog />
                </div>

                <div>
                    <DataTable
                        columns={departmentColumns}
                        data={departments.data}
                        meta={{
                            onDelete: (department: Department) => {
                                router.delete(destroy(department.id).url);
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

DepartmentPage.layout = {
    breadcrumbs: [
        {
            title: 'Departments',
            href: departments.index.url(),
        },
    ],
};

export default DepartmentPage;
