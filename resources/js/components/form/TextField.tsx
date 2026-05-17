import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, error, id, className, ...props }, ref) => {
        const inputId = id || useId();
        return (
            <div className={cn('grid w-full items-center gap-2', className)}>
                {label && <Label htmlFor={inputId}>{label}</Label>}
                <Input
                    id={inputId}
                    className={cn(
                        error && 'border-red-500 focus-visible:ring-red-500',
                    )}
                    {...props}
                    ref={ref}
                />
                {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                )}
            </div>
        );
    },
);
TextField.displayName = 'TextField';
