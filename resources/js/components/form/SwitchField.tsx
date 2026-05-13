import { useId } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

interface SwitchFieldProps {
    id?: string;
    className?: string;
    label: string;
    error?: string;
    description?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    labelPosition?: "top" | "right"
}
export function SwitchField({ id, className, label, error, description, checked, onCheckedChange, disabled, labelPosition = "right" }: SwitchFieldProps) {
    const inputId = id || useId();
    if (labelPosition === 'top') {
        return (
            <div className={cn('grid w-full gap-2', className)}>
                <div className="flex gap-1.5 flex-col">
                    <Label htmlFor={inputId} className={cn(error && 'text-red-500')}>
                        {label}
                    </Label>

                    <Switch
                        id={inputId}
                        checked={checked}
                        onCheckedChange={onCheckedChange}
                        disabled={disabled}
                        className={cn(error && 'ring-2 ring-red-500 ring-offset-2')}
                    />
                </div>

                {description && !error && <p className="text-sm text-muted-foreground">{description}</p>}

                {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            </div >
        )
    }
    return (
        <div className={cn('grid w-full gap-2', className)}>
            <div className="flex gap-1.5 items-center">
                <Switch
                    id={inputId}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                    className={cn(error && 'ring-2 ring-red-500 ring-offset-2')}
                />
                <Label htmlFor={inputId} className={cn(error && 'text-red-500')}>
                    {label}
                </Label>

            </div>

            {description && !error && <p className="text-sm text-muted-foreground">{description}</p>}

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div >
    )
}
