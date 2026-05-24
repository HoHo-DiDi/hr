import { Head, router } from '@inertiajs/react';
import CreateDepartmentDialog from './CreateDepartmentDialog';
import { DataTable } from '@/components/Datatable';
import { departmentColumns } from '../../../modules/department/components/departmentColumns';
import { Department } from '@/modules/department/hooks/type';
import { destroy } from '@/routes/departments';
import { useState } from 'react';

interface PageProps {
    departments: Department[];
}

const DepartmentPage = ({ departments }: PageProps) => {
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
                        data={departments}
                        meta={{
                            onDelete: (department: Department) => {
                                router.delete(destroy(department.id).url);
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default DepartmentPage;
