import { TextField } from '@/components/form/TextField';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Designation } from '../type';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import designations from '@/routes/designations';

interface DialogProps {
    mode: 'create' | 'edit';
    designation: Designation | null;
    onClose: () => void;
    open: boolean;
}

interface FormValues {
    name: string;
}

const DesignationDialog = ({
    mode,
    designation,
    onClose,
    open,
}: DialogProps) => {
    const isEdit = mode === 'edit';
    const { data, setData, errors, reset, post, put, processing } =
        useForm<FormValues>({ name: '' });

    useEffect(() => {
        if (isEdit && designation) {
            setData({ name: designation.name });
        } else {
            reset();
        }
    }, [mode, designation, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && designation) {
            put(designations.update(designation?.id).url, {
                preserveScroll: true,
                onSuccess: onClose,
            });
        } else {
            post(designations.store().url, {
                preserveScroll: true,
                onSuccess: onClose,
            });
        }
    };
    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Designation' : 'Add Designation'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Update the details of the designation.'
                            : 'Create a new designation to organize employees.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Designation Name"
                        id="name"
                        name="name"
                        className="max-w-md"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'} type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {isEdit
                                ? processing
                                    ? 'Editing...'
                                    : 'Edit'
                                : processing
                                  ? 'Creating...'
                                  : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DesignationDialog;
