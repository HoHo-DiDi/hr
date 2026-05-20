import { toDB, toDisplay } from "@/lib/date";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useId, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface DatePickerFieldProps {
    id?: string;
    className?: string;
    label?: string;
    value?: string;
    onChange: (date: string) => void;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
}
export function DatePickerField({
    id,
    className,
    label,
    value,
    onChange,
    error,
    placeholder = "Select a date",
    disabled = false
}: DatePickerFieldProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const dateObject = value ? dayjs(value).toDate() : undefined;
    const [open, setOpen] = useState(false);
    const handleSelect = (newDate: Date | undefined) => {
        if (!newDate) {
            onChange("");
            return;
        }
        onChange(toDB(newDate));
    }

    return (
        <div className={cn(className, 'grid gap-2 ')}>
            {label && <Label htmlFor={inputId}>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={inputId}
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "justify-start font-normal",
                            !value && "text-muted-foreground",
                            error && "border-red-500 text-red-500 focus-visible:ring-red-500"
                        )}
                    >
                        <Calendar1Icon className="mr-2 w-4 h-4 opacity-50 shrink-0" />
                        {
                            value ? toDisplay(value) : <span>{placeholder}</span>
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                    <Calendar mode="single" captionLayout="dropdown" autoFocus selected={dateObject} onSelect={(date) => {
                        handleSelect(date);
                        setOpen(false);
                    }} />
                </PopoverContent>
            </Popover>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>
    )
}