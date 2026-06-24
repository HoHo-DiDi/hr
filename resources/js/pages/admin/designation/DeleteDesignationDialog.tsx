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

const DeleteDesignationDialog = ({
    designation,
    open,
    onOpenChange,
    onDelete,
}: {
    designation: Designation;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: ((designation: Designation) => void) | undefined;
}) => {
    const handleDelete = () => {
        if (onDelete) {
            onDelete(designation);
            onOpenChange(false);
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this desgination?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{designation.name}</strong> and remove it from
                        the system. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDesignationDialog;
