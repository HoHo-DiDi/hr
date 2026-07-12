import { Designation } from '@/modules/designation/type';
import { Head } from '@inertiajs/react';
import { designationColumns } from '@/modules/designation/components/designationColumns';
import { DataTable } from '@/components/data-table';
import { LaravelPagination } from '@/types';
import { useEntityDialog } from '@/hooks/use-entity-dialog';
import { SearchInput } from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import designations from '@/routes/designations';
import DesignationDialog from '@/modules/designation/components/DesignationDialog';
import DeleteDesignationDialog from '@/modules/designation/components/DeleteDesignationDialog';

interface PageProps {
    designations: LaravelPagination<Designation>;
}

const DesignationIndexPage = ({ designations }: PageProps) => {
    const { create, edit, destroy, close, isOpen, item, mode } =
        useEntityDialog<Designation>();

    return (
        <>
            <Head title="Allowances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Designations
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your designations.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <SearchInput />
                        <Button onClick={create}>
                            <Plus className="w-r mr-2 h-4" />
                            Add Designation
                        </Button>
                    </div>
                </div>

                <div>
                    <DataTable
                        paginationData={designations}
                        columns={designationColumns}
                        meta={{
                            onEdit: edit,
                            onDelete: destroy,
                        }}
                    />
                </div>
            </div>

            {isOpen && mode !== 'delete' && (
                <DesignationDialog
                    open={isOpen}
                    mode={mode as 'create' | 'edit'}
                    designation={item}
                    onClose={close}
                />
            )}
            {isOpen && mode === 'delete' && (
                <DeleteDesignationDialog designation={item} onClose={close} />
            )}
        </>
    );
};

DesignationIndexPage.layout = {
    breadcrumbs: [
        {
            title: 'Departments',
            href: designations.index.url(),
        },
    ],
};

export default DesignationIndexPage;
