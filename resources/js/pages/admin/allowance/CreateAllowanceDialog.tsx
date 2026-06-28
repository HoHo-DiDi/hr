import { MultiSelectField } from '@/components/form/MultiSelectField';
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
import { Designation } from '@/modules/designation/type';
import { store } from '@/routes/allowances';
import { Form } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
    designations: Designation[];
}

const CreateAllowanceDialog = ({ designations }: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedDesignations, setSelectedDesignations] = useState<string[]>(
        [],
    );

    const options = designations.map((designation) => ({
        label: designation.name,
        value: designation.id.toString(),
    }));

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
                    transform={(data) => ({
                        ...data,
                        designation_id: selectedDesignations,
                    })}
                    onSuccess={() => {
                        setOpen(false);
                        setSelectedDesignations([]);
                    }}
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
                                    placeholder="Enter name"
                                    className="max-w-md"
                                    error={errors.name}
                                />

                                <MultiSelectField
                                    label="Designation"
                                    placeholder="Select designations"
                                    options={options}
                                    selected={selectedDesignations}
                                    onChange={setSelectedDesignations}
                                    error={errors.designation_id}
                                />
                                <div>
                                    <Label htmlFor="amount">Amount (MMK)</Label>
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
