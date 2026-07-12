import { useForm } from "@inertiajs/react";
import { LeaveType } from "../types";
import { useEffect } from "react";
import leaveTypes from "@/routes/leave-types";
import { TextField } from "@/components/form/TextField";
import { SwitchField } from "@/components/form/SwitchField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FormValues {
    name: string;
    symbol: string;
    yearly_reset: number;
    is_paid: boolean;
    is_refundable: boolean;
    description: string;
}

interface DialogProps {
    mode: 'edit' | 'create';
    open: boolean;
    onClose: () => void;
    leaveType: LeaveType | null
}

export default function LeaveTypeDialog({ mode, open, onClose, leaveType }: DialogProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<FormValues>({
        name: '',
        symbol: '',
        yearly_reset: 0,
        is_paid: false,
        is_refundable: false,
        description: '',
    });
    const isEdit = mode == 'edit';

    useEffect(() => {
        if (isEdit && leaveType) {
            setData({
                name: leaveType.name ?? '',
                symbol: leaveType.symbol ?? '',
                yearly_reset: leaveType.yearly_reset ?? 0,
                is_paid: leaveType.is_paid ?? false,
                is_refundable: leaveType.is_refundable ?? false,
                description: leaveType.description ?? '',
            })
        }
        else {
            reset();
        }
    }, [leaveType, mode, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && leaveType?.id) {
            put(leaveTypes.update(leaveType.id).url, { preserveScroll: true, onSuccess: onClose })
        }
        else {
            post(leaveTypes.store().url, { preserveScroll: true, onSuccess: onClose })
        }
    }

    return <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{isEdit ? "Edit Leave Type" : "Add Leave Type"}</DialogTitle>
                <DialogDescription>
                    {isEdit
                        ? "Update the details of the leave type."
                        : "Create a new leave type to define employee leaves."}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <TextField
                        label="Leave type name"
                        error={errors.name}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <TextField
                        label="Leave type symbol"
                        error={errors.symbol}
                        value={data.symbol}
                        onChange={(e) => setData('symbol', e.target.value)}
                        required
                    />
                    <TextField
                        type="number"
                        label="Yearly reset (days)"
                        error={errors.yearly_reset}
                        value={data.yearly_reset}
                        onChange={(e) => setData('yearly_reset', Number(e.target.value))}
                        min="0"
                        required
                    />
                    <div className="flex gap-4">
                        <SwitchField
                            className="w-fit"
                            label="Paid"
                            error={errors.is_paid}
                            checked={data.is_paid}
                            onCheckedChange={(checked) => setData('is_paid', checked)}
                        />
                        <SwitchField
                            className="w-fit"
                            label="Refundable"
                            error={errors.is_refundable}
                            checked={data.is_refundable}
                            onCheckedChange={(checked) => setData('is_refundable', checked)}
                        />
                    </div>
                    <TextAreaField
                        label="Description"
                        error={errors.description}
                        description="Some description ..."
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" disabled={processing} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {isEdit ? (processing ? "Saving" : "Save Changes") : (processing ? "Creating" : "Create")}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}