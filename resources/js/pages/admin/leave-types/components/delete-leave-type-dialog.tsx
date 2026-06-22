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
import { LeaveType } from "@/modules/types";
import leaveTypes from "@/routes/leave-types";
import { AlertTriangle } from "lucide-react";

interface DeleteLeaveTypeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    leaveType: LeaveType | null;
}

export function DeleteLeaveTypeDialog({ isOpen, onClose, leaveType }: DeleteLeaveTypeDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leaveType) return;

        destroy(leaveTypes.destroy(leaveType.id).url, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            {/* 1. Use standard max-width and let the component handle its own padding */}
            <DialogContent className="sm:max-w-md">

                {/* 2. Wrap the internal content in the form and manage vertical rhythm here */}
                <form onSubmit={handleDelete} className="space-y-6">

                    <DialogHeader>
                        <DialogTitle>Delete Leave Type</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to permanently delete the leave type{" "}
                            <span className="font-semibold text-foreground">"{leaveType?.name}"</span>?
                        </DialogDescription>
                    </DialogHeader>

                    {/* 3. Redesigned Warning Box for better contrast and breathing room */}
                    <div className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-4 dark:border-destructive/30 dark:bg-destructive/20">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-destructive leading-none">
                                This action cannot be undone.
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                If this leave type is currently assigned to employees or has active requests, the system will block this deletion.
                            </p>
                        </div>
                    </div>

                    {/* 4. Let DialogFooter handle its own gap and alignment */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete Leave Type"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}