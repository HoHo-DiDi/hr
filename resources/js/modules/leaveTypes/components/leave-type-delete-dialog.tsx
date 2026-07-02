
import { LeaveType } from "../types";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import leaveTypes from "@/routes/leave-types";
import { useForm } from "@inertiajs/react";

interface LeaveTypeDeleteDialogProps {
    leaveType: LeaveType | null;
    onClose: () => void;
}

export function LeaveTypeDeleteDialog({ leaveType, onClose }: LeaveTypeDeleteDialogProps) {
    const isOpen = leaveType != null;
    const { delete: destroy, processing } = useForm();

    const handleConfirm = () => {
        if (leaveType) {
            destroy(leaveTypes.destroy(leaveType.id).url, {
                onSuccess: () => {
                    onClose();
                }
            })
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trash2Icon className="size-5 text-destructive" />
                        Delete Leave Type
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground">
                            {leaveType?.name}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={processing}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm} disabled={processing}>
                        <Trash2Icon />
                        {processing ? "Deleting" : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
