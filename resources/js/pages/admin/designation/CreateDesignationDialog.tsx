import { TextField } from '@/components/form/TextField';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { store } from '@/routes/designations';
import { Form } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const CreateDesignationDialog = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Designation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <Form
                    action={store()}
                    method="post"
                    onSuccess={() => setOpen(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">
                                    Create Designation
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-6">
                                <TextField
                                    label="Designation Name"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name (eg. Project Manager, Team Lead)"
                                    className="max-w-md"
                                    error={errors.name}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant={'outline'} type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateDesignationDialog;
