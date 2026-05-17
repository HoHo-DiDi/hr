import { Head } from '@inertiajs/react';
import CreateDepartmentDialog from './CreateDepartmentDialog';

const DepartmentPage = () => {
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
            </div>
        </>
    );
};

export default DepartmentPage;
