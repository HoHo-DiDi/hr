import { SearchInput } from "@/components/common/search-input";
import { DataTable } from "@/components/data-table";
import { leaveTypeColumns } from "@/modules/components/leaveTypeColumns";
import { LeaveType } from "@/modules/types";
import { LaravelPagination } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface PageProps {
    leaveTypes: LaravelPagination<LeaveType>
}

const LeaveTypeIndexPage = ({ leaveTypes }: PageProps) => {

    const [searchValue, setSearchValue] = useState((new URLSearchParams(window.location.search).get('search')) || '');

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
                <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>

            <div>
                <DataTable paginationData={leaveTypes} columns={leaveTypeColumns} />
            </div>
        </div>
    </>
}

export default LeaveTypeIndexPage;