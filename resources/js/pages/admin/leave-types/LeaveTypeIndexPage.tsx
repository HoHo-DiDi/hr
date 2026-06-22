import { SearchInput } from "@/components/common/search-input";
import { DataTable } from "@/components/data-table";
import { leaveTypeColumns } from "@/modules/components/leaveTypeColumns";
import { LeaveType } from "@/modules/types";
import { LaravelPagination } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LeaveTypeDialog } from "./components/leave-type-dialog";
import { DeleteLeaveTypeDialog } from "./components/delete-leave-type-dialog";

interface PageProps {
    leaveTypes: LaravelPagination<LeaveType>
}

const LeaveTypeIndexPage = ({ leaveTypes }: PageProps) => {

    const [searchValue, setSearchValue] = useState((new URLSearchParams(window.location.search).get('search')) || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType | null>(null);

    useEffect(() => {

        const timer = setTimeout(() => {
            const currentUrl = new URL(window.location.href);
            const currentSearch = currentUrl.searchParams.get('search') || '';

            if (currentSearch !== searchValue) {
                if (!searchValue) {
                    currentUrl.searchParams.delete('search');
                }
                else {
                    currentUrl.searchParams.set('search', searchValue);
                }
                currentUrl.searchParams.set('page', '1');
            }
            router.get(currentUrl.pathname,
                Object.fromEntries(currentUrl.searchParams.entries()),
                {
                    preserveState: true,
                    preserveScroll: true
                }
            )
        }, 300)

        return () => clearTimeout(timer);
    }, [searchValue])

    const handleEdit = (leaveType: LeaveType) => {
        setSelectedLeaveType(leaveType);
        setIsFormOpen(true);
    };

    const handleDelete = (leaveType: LeaveType) => {
        setSelectedLeaveType(leaveType);
        setIsDeleteOpen(true);
    };

    const handleAdd = () => {
        setSelectedLeaveType(null);
        setIsFormOpen(true);
    };

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
                <div className="flex items-center gap-2">
                    <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Leave Type
                    </Button>
                </div>
            </div>

            <div>
                <DataTable
                    paginationData={leaveTypes}
                    columns={leaveTypeColumns}
                    meta={{
                        onEdit: handleEdit,
                        onDelete: handleDelete,
                    }}
                />
            </div>
        </div>

        <LeaveTypeDialog
            isOpen={isFormOpen}
            onClose={() => {
                setIsFormOpen(false);
                setSelectedLeaveType(null);
            }}
            leaveType={selectedLeaveType}
        />

        <DeleteLeaveTypeDialog
            isOpen={isDeleteOpen}
            onClose={() => {
                setIsDeleteOpen(false);
                setSelectedLeaveType(null);
            }}
            leaveType={selectedLeaveType}
        />
    </>
}

export default LeaveTypeIndexPage;