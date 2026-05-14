import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

interface SelectOption {
    label: string;
    value: string;
}
interface SearchableSelectFieldProps {
    id?: string;
    className?: string;
    label?: string;
    value: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    options: SelectOption[];
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
}
export function SearchableSelectField({
    id,
    className,
    label,
    value,
    description,
    error,
    disabled = false,
    options = [],
    onChange,
    placeholder = 'Select an option...',
    searchPlaceholder = 'Search ...',
    emptyMessage = 'No options found'
}: SearchableSelectFieldProps) {
    const inputId = id || useId();
    const [open, setOpen] = useState(false);
    const selectedOption = options.find(option => option.value === value);
    return (
        <div className={cn('grid w-full gap-1.5', className)}>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="justify-between" id={inputId} disabled={disabled}>
                        {selectedOption ? selectedOption.label : placeholder}
                        <ChevronsUpDown className="ml-2 w-4 h-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} className="h-9" />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {
                                    options.map(option => <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() => onChange?.(value === option.value ? "" : option.value)}
                                    >
                                        {option.label}
                                        <Check className={cn("ml-auto h-4 w-4", option.value === value ? 'opacity-100' : 'opacity-0')} />
                                    </CommandItem>)
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {!error && description && <p className="text-sm text-muted-foreground">{description}</p>}
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div>
    )
}