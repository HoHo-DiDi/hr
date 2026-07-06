import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CreateDepartmentDialog from './CreateDepartmentDialog';
import { departmentColumns } from '../../../modules/department/components/departmentColumns';
import { Department } from '@/modules/department/type';
import departments, { destroy } from '@/routes/departments';
import { DataTable } from '@/components/data-table';
import { LaravelPagination } from '@/types';
import { useEntityDialog } from '@/hooks/use-entity-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DepartmentDialog } from './DepartmentDialog';
import { DeleteDepartmentDialog } from './DeleteDepartmentDialog';



interface PageProps {
    departments: LaravelPagination<Department>;
}

const DepartmentPage = ({ departments }: PageProps) => {

    const {
        create,
        edit,
        destroy,
        close,
        isOpen,
        item,
        mode
    } = useEntityDialog<Department>();

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
                    <Button onClick={create}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Department
                    </Button>
                </div>

                <div>
                    <DataTable
                        paginationData={departments}
                        columns={departmentColumns}
                        meta={{
                            onEdit: edit,
                            onDelete: destroy
                        }}
                    />
                </div>
            </div>
            {isOpen && mode !== 'delete' && <DepartmentDialog open={isOpen} mode={mode as 'create' | 'edit'} department={item} onClose={close} />}
            {isOpen && mode === 'delete' && <DeleteDepartmentDialog department={item} onClose={close} />}
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
