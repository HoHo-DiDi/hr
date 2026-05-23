import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "../ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "../ui/command";

interface Option {
    label: string;
    value: string;
}

interface MultiSelectFieldProps {
    id?: string;
    className?: string;
    label?: string;
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    description?: string;
}

export function MultiSelectField({
    id,
    className,
    label,
    options = [],
    selected = [],
    onChange,
    error,
    disabled = false,
    placeholder = "Select an option",
    searchPlaceholder = "Search ...",
    emptyMessage = "No options found",
    description
}: MultiSelectFieldProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [open, setOpen] = useState(false);

    const handleSelect = (value: string) => {
        if (!value) return;

        const isAlreadySelected = selected.includes(value);
        if (isAlreadySelected) {
            onChange(selected.filter(v => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const removeSelect = (e: React.MouseEvent, value: string) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(selected.filter(v => v !== value));
    };

    return (
        <div className={cn('w-full grid gap-2', className)}>
            {label && <Label htmlFor={inputId}>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={inputId}
                        role="combobox"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            'flex w-full items-center justify-between font-normal',
                            'h-auto min-h-10 px-3 py-2',
                            error && "text-red-500 border-red-500 focus-visible:ring-red-500",
                            !selected.length && "text-muted-foreground"
                        )}
                    >
                        <div className="flex flex-wrap items-center gap-1 w-full overflow-hidden">
                            {!selected.length && <span>{placeholder}</span>}

                            {selected.map(value => {
                                const option = options.find(opt => value === opt.value);
                                if (!option) return null;

                                return (
                                    <Badge
                                        variant="secondary"
                                        key={option.value}
                                        className="flex items-center gap-1 rounded-sm px-2 py-0.5 font-normal"
                                    >
                                        {option.label}
                                        <div
                                            role="button"
                                            className="ml-1 rounded-full p-0.5 outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 text-red-500 hover:text-red-700  transition-colors"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onClick={(e) => removeSelect(e, option.value)}
                                        >
                                            <X className="h-3 w-3" />
                                        </div>
                                    </Badge>
                                );
                            })}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                {/* Match the dropdown width to the trigger button width */}
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                                {options.map(option => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                    >
                                        <div className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center",
                                            selected.includes(option.value) ? "opacity-100" : "opacity-0"
                                        )}>
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            {!error && description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}