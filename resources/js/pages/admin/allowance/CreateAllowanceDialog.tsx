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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { store } from '@/routes/allowances';
import { Form } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const CreateAllowanceDialog = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Allowance
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
                                    Create Allowance
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-6">
                                <TextField
                                    label="Allowance Name"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name (eg. Bill Allowance, Ferry Allowance)"
                                    className="max-w-md"
                                    error={errors.name}
                                />
                                <div>
                                    <Label htmlFor="amount">
                                        Amount (MMK)k
                                    </Label>
                                    <Input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        placeholder="1000"
                                        className={cn(
                                            errors.name &&
                                                'border-red-500focus-visible:ring-red-500',
                                            'mt-2',
                                        )}
                                    />
                                    {errors.amount && (
                                        <p className="text-sm font-medium text-red-500">
                                            Invalid amount
                                        </p>
                                    )}
                                </div>
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

export default CreateAllowanceDialog;
