import { toDB, toDisplay } from '@/lib/date';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState, useId } from 'react';
import { DateRange } from 'react-day-picker';
import dayjs from 'dayjs';
import { Label } from '../ui/label';

export interface DateRangePickerProps {
    dateFrom?: string | null;
    dateTo?: string | null;
    onDateChange: (from: string, to: string) => void;
    placeholder?: string;
    className?: string;
    id?: string;
    disabled?: boolean;
    label?: string;
    error?: string;
    description?: string;
}

const presetRanges = [
    { label: 'Today', getValue: () => ({ from: dayjs().toDate(), to: dayjs().toDate() }) },
    { label: 'Yesterday', getValue: () => ({ from: dayjs().subtract(1, 'day').toDate(), to: dayjs().subtract(1, 'day').toDate() }) },
    { label: 'Last 7 days', getValue: () => ({ from: dayjs().subtract(6, 'day').toDate(), to: dayjs().toDate() }) },
    { label: 'Last 30 days', getValue: () => ({ from: dayjs().subtract(29, 'day').toDate(), to: dayjs().toDate() }) },
    { label: 'This month', getValue: () => ({ from: dayjs().startOf('month').toDate(), to: dayjs().endOf('month').toDate() }) },
    {
        label: 'Last month', getValue: () => {
            const lastMonth = dayjs().subtract(1, 'month');
            return { from: lastMonth.startOf('month').toDate(), to: lastMonth.endOf('month').toDate() };
        }
    },
    { label: 'This year', getValue: () => ({ from: dayjs().startOf('year').toDate(), to: dayjs().endOf('year').toDate() }) },
    {
        label: 'Last year', getValue: () => {
            const lastYear = dayjs().subtract(1, 'year');
            return { from: lastYear.startOf('year').toDate(), to: lastYear.endOf('year').toDate() };
        }
    },
];

export function DateRangePicker({
    dateFrom,
    dateTo,
    onDateChange,
    placeholder = 'Select date range',
    className,
    id,
    disabled = false,
    error,
    description,
    label
}: DateRangePickerProps) {
    const defaultId = useId();
    const inputId = id || defaultId;
    const [open, setOpen] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [internalDate, setInternalDate] = useState<DateRange | undefined>();

    useEffect(() => {
        setInternalDate(dateFrom ? {
            from: dayjs(dateFrom).toDate(),
            to: dateTo ? dayjs(dateTo).toDate() : undefined
        } : undefined);
    }, [dateFrom, dateTo]);

    const commitDate = (range: DateRange | undefined) => {
        if (range?.from) {
            const fromStr = toDB(range.from);
            const toStr = range.to ? toDB(range.to) : fromStr;
            onDateChange(fromStr, toStr);
        } else {
            onDateChange('', '');
        }
        setOpen(false);
    };

    const handleClear = () => {
        setInternalDate(undefined);
        commitDate(undefined);
    };

    return (
        <div className={cn(
            'grid gap-2',
            className
        )}>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            <Popover
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        setShowCalendar(false);
                        setInternalDate(dateFrom ? {
                            from: dayjs(dateFrom).toDate(),
                            to: dateTo ? dayjs(dateTo).toDate() : undefined
                        } : undefined);
                    }
                }}
            >
                <PopoverTrigger asChild>
                    <Button
                        id={inputId}
                        disabled={disabled}
                        variant="outline"
                        className={cn('w-full justify-start truncate text-left font-normal', !internalDate && 'text-muted-foreground')}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        {internalDate?.from ? (
                            internalDate.to
                                ? `${toDisplay(internalDate.from)} - ${toDisplay(internalDate.to)}`
                                : toDisplay(internalDate.from)
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>

                {/* The flex-row layout here guarantees the side-by-side appearance */}
                <PopoverContent className="w-auto p-0 flex flex-row items-stretch" align="start">

                    {/* Left Side: Presets Menu */}
                    <div className="flex w-40 flex-col gap-1 p-2">
                        {presetRanges.map((preset) => (
                            <Button
                                key={preset.label}
                                variant="ghost"
                                size="sm"
                                className="justify-start font-normal"
                                onClick={() => {
                                    const range = preset.getValue();
                                    setInternalDate(range);
                                    commitDate(range);
                                    setShowCalendar(false);
                                }}
                            >
                                {preset.label}
                            </Button>
                        ))}
                        <Button
                            variant={showCalendar ? "secondary" : "ghost"}
                            size="sm"
                            className="justify-start font-normal"
                            onClick={() => setShowCalendar(true)}
                        >
                            Custom
                        </Button>
                    </div>

                    {/* Right Side: 2-Month Calendar Container */}
                    {showCalendar && (
                        <div className="flex flex-col border-l">
                            <Calendar
                                autoFocus
                                mode="range"
                                defaultMonth={internalDate?.from}
                                selected={internalDate}
                                onSelect={setInternalDate}
                                numberOfMonths={2}
                            />
                            <div className="flex justify-end gap-2 border-t p-2">
                                <Button className="text-red-600 hover:text-red-700 hover:bg-red-50" variant="ghost" size="sm" onClick={handleClear}>
                                    Clear
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => commitDate(internalDate)}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
            {!error && description && <p className='text-sm text-muted-foreground'>{description}</p>}
            {error && <p className='text-sm text-red-500 font-medium'>{error}</p>}
        </div>
    );
}