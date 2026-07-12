import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Allowance } from '@/modules/allowance/type';
import allowances from '@/routes/allowances';
import { useForm } from '@inertiajs/react';

interface DialogProps {
    allowance: Allowance | null;
    onClose: () => void;
}
const DeleteAllowanceDialog = ({ allowance, onClose }: DialogProps) => {
    const isOpen = !!allowance;
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (allowance) {
            destroy(allowances.destroy(allowance.id).url, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this allowance?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{allowance?.name}</strong> and remove it from
                        the system. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(open) => !open && onClose()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                    >
                        {processing ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAllowanceDialog;
