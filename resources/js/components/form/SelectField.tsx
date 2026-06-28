import { cn } from '@/lib/utils';
import { useId } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

interface SelectOption {
    label: string;
    value: string;
}
interface SelectFieldProps {
    id?: string;
    label?: string;
    className?: string;
    value?: string;
    description?: string;
    error?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    options: SelectOption[];
}

export function SelectField({
    id,
    label,
    className,
    value,
    description,
    error,
    placeholder = 'Select an option',
    onChange,
    disabled = false,
    options = [],
}: SelectFieldProps) {
    const inputId = id || useId();
    return (
        <div className={cn('grid w-full gap-1.5', className)}>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger
                    id={inputId}
                    className={cn(
                        !value && 'text-muted-foreground',
                        error && 'border-red-500 focus:ring-red-500',
                        'w-full',
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {!error && description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
            )}
        </div>
    );
}
