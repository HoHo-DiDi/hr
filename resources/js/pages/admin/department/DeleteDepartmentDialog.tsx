import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Department } from "@/modules/department/type"
import departments from "@/routes/departments";
import { useForm } from "@inertiajs/react";

interface DialogProps {
    department: Department | null;
    onClose: () => void;
}

export const DeleteDepartmentDialog = ({ department, onClose }: DialogProps) => {
    const isOpen = !!department;
    const { delete: destroy, processing } = useForm();
    const handleDelete = () => {
        if (department) {
            destroy(departments.destroy(department.id).url);
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this department?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{department?.name}</strong> and remove it from
                        the system. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing} onClick={() => onClose()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={processing}
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
