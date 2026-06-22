import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react"; // Or your preferred icon pack

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ className, placeholder = "Search...", ...props }, ref) => {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
                placeholder={placeholder}
                type="search"
                className={cn("pl-9 pr-4", className)}
                {...props}
                ref={ref}
            />
        </div>
    );
});

SearchInput.displayName = "SearchInput";
export { SearchInput };