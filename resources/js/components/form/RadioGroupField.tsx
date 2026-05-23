import { cn } from '@/lib/utils';
import { useId } from 'react';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface Option {
    label: string;
    value: string;
    description?: string;
}

interface RadioGroupFieldProps {
    label?: string;
    options: Option[];
    value?: string;
    onValueChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    orientation?: 'vertical' | 'horizontal';
}

export function RadioGroupField
    ({
        label,
        options,
        value,
        onValueChange,
        error,
        disabled,
        className,
        id,
        orientation = 'vertical',
    }: RadioGroupFieldProps) {
    const generatedId = useId();
    const groupId = id || generatedId;

    return (
        <div className={cn('grid gap-3 w-full', className)}>
            {label && <Label className={cn('text-base font-semibold', error && 'text-red-500')}>{label}</Label>}

            <RadioGroup
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
                className={cn(orientation === 'horizontal' ? 'flex flex-row gap-6' : 'flex flex-col gap-4')}
            >
                {options.map((option) => {
                    const optionId = `${groupId}-${option.value}`;
                    return (
                        <div key={option.value} className="flex items-start space-x-3">
                            <RadioGroupItem
                                value={option.value}
                                id={optionId}
                                className={cn('mt-0.5', error && 'border-red-500 text-red-500 focus-visible:ring-red-500')}
                            />

                            <div className="grid gap-1 leading-none">
                                <Label htmlFor={optionId} className="cursor-pointer font-medium text-sm">
                                    {option.label}
                                </Label>
                                {option.description && (
                                    <p className="text-sm text-muted-foreground leading-normal">
                                        {option.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </RadioGroup>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div>
    );
}