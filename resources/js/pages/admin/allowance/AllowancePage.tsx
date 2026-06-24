import { Head } from '@inertiajs/react';
import { Allowance } from '@/modules/allowance/type';
import CreateAllowanceDialog from './CreateAllowanceDialog';

interface PageProps {
    allowances: Allowance[];
}

const AllowancePage = ({ allowances }: PageProps) => {
    console.log(allowances);

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
                    <CreateAllowanceDialog />
                </div>
            </div>
        </>
    );
};

export default AllowancePage;
