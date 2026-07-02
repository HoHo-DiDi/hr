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

const DeleteAllowanceDialog = ({
    open,
    onOpenChange,
    allowance,
    onDelete,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    allowance: Allowance;
    onDelete: ((allowance: Allowance) => void) | undefined;
}) => {
    const handleDelete = () => {
        if (onDelete) {
            onDelete(allowance);
            onOpenChange(false);
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this allowance?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{allowance.name}</strong> and remove it from the
                        system. This action cannot be undone.
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

export default DeleteAllowanceDialog;
