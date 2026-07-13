import { DataTable } from "@/components/data-table";
import { employeeColumns } from "@/modules/employees/components/employeeColumns";
import { Employee } from "@/modules/employees/types";
import { LaravelPagination } from "@/types";
import { Head } from "@inertiajs/react";

export default function EmployeeIndexPage({ employees }: { employees: LaravelPagination<Employee> }) {
    return (
        <>
            <Head title="Employees" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Employees
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            View and manage your organization's employee records
                        </p>
                    </div>
                </div>

                <div>
                    <DataTable
                        paginationData={employees}
                        columns={employeeColumns}
                    />
                </div>
            </div>
        </>
    );
}