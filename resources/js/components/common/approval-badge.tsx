import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface PageProps {
    value: 'pending' | 'approved' | 'rejected'
}
export default function ApprovalBagdeCell({ value }: PageProps) {

    let appliedClass;
    switch (value) {
        case 'approved':
            appliedClass = "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
            break;
        case 'rejected':
            appliedClass = "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
            break;
        default:
            appliedClass = "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    }

    return <Badge className={cn('capitalize', appliedClass)}>
        {value}
    </Badge>
}