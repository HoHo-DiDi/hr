import { LeaveType } from "@/modules/leaveTypes/types"
import { LaravelPagination } from "@/types"
import { Head } from "@inertiajs/react"

interface IndexPageProps {
    leaveTypes: LaravelPagination<LeaveType>
}

export default function IndexPage({ leaveTypes }: IndexPageProps) {
    return <>
        <Head title="Leave Types" />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="mb-2 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">
                        Leave Types
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your leave types.
                    </p>
                </div>
            </div>
        </div>
    </>
}