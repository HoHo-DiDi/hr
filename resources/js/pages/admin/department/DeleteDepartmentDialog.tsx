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
import { Department } from '@/modules/department/type';
import React from 'react';

const DeleteDepartmentDialog = ({
    open,
    onOpenChange,
    department,
    onDelete,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    department: Department;
    onDelete: ((department: Department) => void) | undefined;
}) => {
    const handleDelete = () => {
        if (onDelete) {
            onDelete(department);
            onOpenChange(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this department?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        <strong>{department.name}</strong> and remove it from
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

export default DeleteDepartmentDialog;
