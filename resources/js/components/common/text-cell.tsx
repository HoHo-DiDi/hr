interface TextCellProps {
    value: string | number
}

export default function TextCell({ value }: TextCellProps) {
    return <div className="flex items-center">
        <span className="font-medium capitalize">{value ?? "-"}</span>
    </div>
}