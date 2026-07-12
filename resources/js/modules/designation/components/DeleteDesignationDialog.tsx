import { Designation } from '@/modules/designation/type';
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
import { useForm } from '@inertiajs/react';
import designations from '@/routes/designations';

interface DialogProps {
    designation: Designation | null;
    onClose: () => void;
}
const DeleteDesignationDialog = ({ designation, onClose }: DialogProps) => {
    const isOpen = !!designation;
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (designation) {
            destroy(designations.destroy(designation.id).url, {
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
                        Are you sure you want to delete this desgination?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{designation?.name}</strong> and remove it from
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

export default DeleteDesignationDialog;
