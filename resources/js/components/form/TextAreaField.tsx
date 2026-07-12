import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes, useId } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    description?: string;
    error?: string;
}
export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(({ id, className, error, label, description, ...props }, ref) => {
    const inputId = id || useId();
    return (<div className={cn("w-full grid gap-2 items-center", className)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Textarea id={inputId} className={cn(error && "border-red-500 focus-visible:ring-red-500")} ref={ref} {...props}></Textarea>
        {!error && description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
    </div>)
});
TextAreaField.displayName = "TextAreaField"