
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { LeaveType } from "../types";
import leaveTypes from "@/routes/leave-types";
import { useForm } from "@inertiajs/react";

interface LeaveTypeDeleteDialogProps {
    leaveType: LeaveType | null;
    onClose: () => void;
}

export function LeaveTypeDeleteDialog({ leaveType, onClose }: LeaveTypeDeleteDialogProps) {
    const isOpen = !!leaveType;
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (leaveType) {
            destroy(leaveTypes.destroy(leaveType.id).url, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this leave type?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{leaveType?.name}</strong> and remove it from the system. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing} onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={processing}
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                    >
                        {processing ? 'Deleting' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
