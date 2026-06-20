import { DataTable } from "@/components/data-table";
import { leaveTypeColumns } from "@/modules/components/leaveTypeColumns";
import { LaravelPagination } from "@/types";
import { LeaveType } from "@/types/leave-type";
import { Head } from "@inertiajs/react";

interface PageProps {
    leaveTypes: LaravelPagination<LeaveType>
}

const LeaveTypeIndexPage = ({ leaveTypes }: PageProps) => {
    return <>
        <Head title="Leave Types" />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="mb-2 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">
                        Leave Types
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your Leave Types.
                    </p>
                </div>
            </div>

            <div>
                <DataTable paginationData={leaveTypes} columns={leaveTypeColumns} />
            </div>
        </div>
    </>
}

export default LeaveTypeIndexPage;