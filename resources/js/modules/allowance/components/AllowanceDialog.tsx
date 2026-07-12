import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Designation } from '@/modules/designation/type';
import { Allowance } from '../type';
import { TextField } from '@/components/form/TextField';
import { MultiSelectField } from '@/components/form/MultiSelectField';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import allowances from '@/routes/allowances';

interface DialogProps {
    mode: 'create' | 'edit';
    allowance: Allowance | null;
    designations: Designation[];
    onClose: () => void;
    open: boolean;
}

interface FormValues {
    name: string;
    designation_id: string[];
    amount: number;
}

const AllowanceDialog = ({
    mode,
    allowance,
    designations,
    onClose,
    open,
}: DialogProps) => {
    const isEdit = mode === 'edit';

    const { data, setData, errors, reset, post, put, processing } =
        useForm<FormValues>({
            name: '',
            designation_id: [],
            amount: 0,
        });

    const options = designations.map((designation) => ({
        label: designation.name,
        value: designation.id.toString(),
    }));

    useEffect(() => {
        if (isEdit && allowance) {
            setData({
                name: allowance.name,
                designation_id:
                    allowance.designations?.map((d) => d.id.toString()) || [],
                amount: allowance.amount,
            });
        } else {
            reset();
        }
    }, [mode, allowance, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && allowance) {
            put(allowances.update(allowance.id).url, {
                preserveScroll: true,
                onSuccess: onClose,
            });
        } else {
            post(allowances.store().url, {
                preserveScroll: true,
                onSuccess: onClose,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            {isEdit ? 'Edit Allowance' : 'Create Allowance'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-6">
                        <TextField
                            label="Allowance Name"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            className="max-w-md"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                        />

                        <MultiSelectField
                            label="Designation"
                            placeholder="Select designations"
                            options={options}
                            selected={data.designation_id}
                            onChange={(selectedIds) => {
                                setData('designation_id', selectedIds);
                            }}
                            error={errors.designation_id}
                        />

                        <div>
                            <Label htmlFor="amount">Amount (MMK)</Label>
                            <Input
                                type="number"
                                name="amount"
                                id="amount"
                                placeholder="1000"
                                value={data.amount}
                                onChange={(e) =>
                                    setData('amount', Number(e.target.value))
                                }
                                className={cn(
                                    errors.amount &&
                                        'border-red-500 focus-visible:ring-red-500',
                                    'mt-2',
                                )}
                            />
                            {errors.amount && (
                                <p className="text-sm font-medium text-red-500">
                                    {errors.amount}
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

export default AllowanceDialog;
