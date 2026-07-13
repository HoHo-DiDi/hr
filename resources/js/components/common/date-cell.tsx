interface DateCellProps {
    value: string | null;
    format?: Intl.DateTimeFormatOptions
}

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: 'short',
    day: 'numeric'
}

export default function DateCell({ value, format = DEFAULT_FORMAT }: DateCellProps) {
    if (!value) return <span className="text-gray-400">-</span>
    const date = new Date(value);
    if (isNaN(date.getTime())) return <span className="text-gray-400">Invalid Date</span>
    return <time dateTime={value}>
        {
            date.toLocaleDateString('en-US', format)
        }
    </time>
}