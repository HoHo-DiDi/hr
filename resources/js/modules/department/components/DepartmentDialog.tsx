import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Department } from "@/modules/department/type";
import departments from "@/routes/departments";
import { useForm } from "@inertiajs/react";
import { ReactEventHandler, useEffect } from "react";

interface DialogProps {
    mode: 'create' | 'edit';
    department: Department | null;
    onClose: () => void;
    open: boolean;
}

interface FormValues {
    name: string;
}

export const DepartmentDialog = ({ mode, department, onClose, open }: DialogProps) => {

    const isEdit = mode === 'edit';
    const { data, setData, errors, reset, post, put, processing } = useForm<FormValues>({ name: '' })

    useEffect(() => {
        if (isEdit && department) {
            setData({ name: department.name })
        }
        else {
            reset();
        }
    }, [mode, department, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && department) {
            put(departments.update(department?.id).url, { preserveScroll: true, onSuccess: onClose })
        }
        else {
            post(departments.store().url, { preserveScroll: true, onSuccess: onClose })

        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Department" : "Add Department"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the details of the department."
                            : "Create a new department to organize employees."}
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={onClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {isEdit ? (processing ? "Saving" : "Save Changes") : (processing ? "Creating" : "Create")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
