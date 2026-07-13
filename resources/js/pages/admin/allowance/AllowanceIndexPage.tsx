import { Head } from '@inertiajs/react';
import { Allowance } from '@/modules/allowance/type';
import { Designation } from '@/modules/designation/type';
import { allowanceColumns } from '@/modules/allowance/components/allowanceColumns';
import allowances, { destroy } from '@/routes/allowances';
import { DataTable } from '@/components/data-table';
import { LaravelPagination } from '@/types';
import { useEntityDialog } from '@/hooks/use-entity-dialog';
import { SearchInput } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AllowanceDialog from '@/modules/allowance/components/AllowanceDialog';
import DeleteAllowanceDialog from '@/modules/allowance/components/DeleteAllowanceDialog';

interface PageProps {
    allowances: LaravelPagination<Allowance>;
    designations: Designation[];
}

const AllowanceIndexPage = ({ allowances, designations }: PageProps) => {
    const { create, edit, destroy, close, isOpen, item, mode } =
        useEntityDialog<Allowance>();

    return (
        <>
            <Head title="Allowances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Allowances
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your allowances.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <SearchInput />
                        <Button onClick={create}>
                            <Plus className="w-r mr-2 h-4" />
                            Add Allowance
                        </Button>
                    </div>
                </div>

                <div>
                    <DataTable
                        columns={allowanceColumns}
                        paginationData={allowances}
                        meta={{
                            onEdit: edit,
                            onDelete: destroy,
                        }}
                    />
                </div>
            </div>

            {isOpen && mode !== 'delete' && (
                <AllowanceDialog
                    open={isOpen}
                    mode={mode as 'create' | 'edit'}
                    allowance={item}
                    designations={designations}
                    onClose={close}
                />
            )}
            {isOpen && mode === 'delete' && (
                <DeleteAllowanceDialog allowance={item} onClose={close} />
            )}
        </>
    );
};

AllowanceIndexPage.layout = {
    breadcrumbs: [
        {
            title: 'Allowances',
            href: allowances.index.url(),
        },
    ],
};

export default AllowanceIndexPage;
