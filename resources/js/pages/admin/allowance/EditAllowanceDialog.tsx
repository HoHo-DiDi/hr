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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Allowance } from '@/modules/allowance/type';
import { Designation } from '@/modules/designation/type';
import { update } from '@/routes/allowances';
import { Form } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Props = {
    allowance: Allowance;
    designations: Designation[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const EditAllowanceDialog = ({
    open,
    onOpenChange,
    allowance,
    designations,
}: Props) => {
    const options = designations.map((designation: Designation) => ({
        label: designation.name,
        value: designation.id.toString(),
    }));

    const [selectedDesignations, setSelectedDesignations] = useState<string[]>(
        () => allowance.designations?.map((d) => d.id.toString()) ?? [],
    );

    useEffect(() => {
        if (open) {
            setSelectedDesignations(
                allowance.designations?.map((d) => d.id.toString()) ?? [],
            );
        }
    }, [open, allowance]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <Form
                    action={update(allowance.id)}
                    method="put"
                    transform={(data) => ({
                        ...data,
                        designation_id: selectedDesignations,
                    })}
                    onSuccess={() => {
                        onOpenChange(false);
                        setSelectedDesignations([]);
                    }}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">
                                    Edit Allowance
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-6">
                                <TextField
                                    label="Allowance Name"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name"
                                    defaultValue={allowance.name}
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
                                        defaultValue={allowance.amount}
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
                                    {processing ? 'Updating...' : 'Update'}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditAllowanceDialog;
