import { TextField } from '@/components/form/TextField';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { update } from '@/routes/designations';
import { Form } from '@inertiajs/react';

type Props = {
    id: number;
    name: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const EditDesignationDialog = ({ id, name, open, onOpenChange }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <Form
                    action={update(id)}
                    method="put"
                    onSuccess={() => onOpenChange(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">
                                    Edit Designation
                                </DialogTitle>
                            </DialogHeader>
                            <div className="py-6">
                                <TextField
                                    label="Department Name"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name (eg. Project Manager, Team Lead)"
                                    className="max-w-md"
                                    error={errors.name}
                                    defaultValue={name}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Editing...' : 'Edit'}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDesignationDialog;
