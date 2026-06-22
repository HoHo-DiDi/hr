import { Badge } from "../ui/badge";

interface PageProps {
    value: boolean
}
export default function ToggleBadgeCell({ value }: PageProps) {
    const greenClass = "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
    const redClass = "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
    return <Badge className={value ? greenClass : redClass}>
        {value ? "Yes" : "No"}
    </Badge>
}