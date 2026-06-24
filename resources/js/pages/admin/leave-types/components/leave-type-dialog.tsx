import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/form/CheckboxField";
import { LeaveType } from "@/modules/types";
import leaveTypes from "@/routes/leave-types";
import { TextField } from "@/components/form/TextField";
import { TextAreaField } from "@/components/form/TextAreaField";

interface LeaveTypeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    leaveType?: LeaveType | null;
}

export function LeaveTypeDialog({ isOpen, onClose, leaveType }: LeaveTypeDialogProps) {
    const isEdit = !!leaveType;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: "",
        symbol: "",
        yearly_reset: 0,
        is_paid: false,
        is_refundable: false,
        description: "",
    });

    useEffect(() => {
        if (isOpen) {
            if (leaveType) {
                setData({
                    name: leaveType.name,
                    symbol: leaveType.symbol,
                    yearly_reset: leaveType.yearly_reset,
                    is_paid: leaveType.is_paid,
                    is_refundable: leaveType.is_refundable,
                    description: leaveType.description ?? "",
                });
            } else {
                reset();
            }
            clearErrors();
        } else {
            // Always reset when dialog closes so stale edit data
            // never hydrates a subsequent create form.
            reset();
            clearErrors();
        }
    }, [isOpen, leaveType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && leaveType) {
            put(leaveTypes.update(leaveType.id).url, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(leaveTypes.store().url, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Leave Type" : "Add Leave Type"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the details of the leave type."
                            : "Create a new leave type to define employee leaves."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        placeholder="e.g. Annual Leave"
                        required
                    />

                    <TextField
                        label="Symbol"
                        value={data.symbol}
                        onChange={(e) => setData("symbol", e.target.value)}
                        error={errors.symbol}
                        placeholder="e.g. AL"
                        required
                    />

                    <TextField
                        label="Yearly Reset (Days)"
                        type="number"
                        min="0"
                        value={data.yearly_reset}
                        onChange={(e) => setData("yearly_reset", parseInt(e.target.value) || 0)}
                        error={errors.yearly_reset}
                        required
                    />

                    <div className="flex gap-4">
                        <CheckboxField
                            label="Paid Leave"
                            checked={data.is_paid}
                            onCheckedChange={(val) => setData("is_paid", val)}
                            error={errors.is_paid}
                        />

                        <CheckboxField
                            label="Refundable"
                            checked={data.is_refundable}
                            onCheckedChange={(val) => setData("is_refundable", val)}
                            error={errors.is_refundable}
                        />
                    </div>

                    <TextAreaField
                        label="Description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        error={errors.description}
                        placeholder="Optional description of the leave type"
                    />

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {isEdit ? "Save Changes" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
