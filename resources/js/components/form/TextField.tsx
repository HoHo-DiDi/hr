import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useId } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ label, error, id, className, ...props }, ref) => {
    const inputId = id || useId();
    return (
        <div className={cn('w-full grid items-center gap-2', className)}>
            {label && <Label htmlFor={inputId} >{label}</Label>}
            <Input id={inputId} className={cn(error && "border-red-500 focus-visible:ring-red-500")} {...props} ref={ref} />
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>
    )
});
TextField.displayName = "TextField";