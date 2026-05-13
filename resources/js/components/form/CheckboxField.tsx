import { cn } from "@/lib/utils";
import { useId } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxFieldProps {
    id?: string;
    label: string;
    className?: string;
    description?: string;
    error?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean
}
export function CheckboxFiel({ id, label, className, description, error, checked, onCheckedChange, disabled }: CheckboxFieldProps) {
    const inputId = id || useId();
    return <div className={cn("space-y-2", className)}>
        <div className="flex items-start gap-2">
            <Checkbox
                className={cn(error && "border-red-500")}
                id={inputId} checked={checked}
                disabled={disabled}
                onCheckedChange={(val) => onCheckedChange(val as boolean)} />
            <div className="grid gap-1.5">
                <Label htmlFor={inputId} >{label}</Label>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
        </div>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
}