import { SearchInput } from "@/components/common/search-input"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { useEntityDialog } from "@/hooks/use-entity-dialog"
import { LeaveTypeDeleteDialog } from "@/modules/leaveTypes/components/LeaveTypeDeleteDialog"
import LeaveTypeDialog from "@/modules/leaveTypes/components/LeaveTypeDialog"
import { leaveTypeColumns } from "@/modules/leaveTypes/components/leaveTypeColumns"
import { LeaveType } from "@/modules/leaveTypes/types"
import { LaravelPagination } from "@/types"
import { Head } from "@inertiajs/react"
import { Plus } from "lucide-react"

interface IndexPageProps {
    leaveTypes: LaravelPagination<LeaveType>
}

export default function IndexPage({ leaveTypes }: IndexPageProps) {
    const {
        create,
        edit,
        destroy,
        close,
        isOpen,
        item,
        mode,
    } = useEntityDialog<LeaveType>();
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
                    <SearchInput />
                    <Button
                        onClick={create}
                    >
                        <Plus className="mr-2 h-4 w-r" />
                        Add Leave Type
                    </Button>
                </div>

            </div>

            <div>
                <DataTable
                    paginationData={leaveTypes}
                    columns={leaveTypeColumns}
                    meta={{
                        onEdit: edit,
                        onDelete: destroy
                    }}
                />
            </div>
        </div>
        {isOpen && mode !== 'delete' && <LeaveTypeDialog mode={mode as 'create' | 'edit'} open={isOpen} onClose={close} leaveType={item} />}
        {isOpen && mode == 'delete' && < LeaveTypeDeleteDialog onClose={close} leaveType={item} />}
    </>
}