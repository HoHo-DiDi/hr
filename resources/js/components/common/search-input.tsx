import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import qs from "qs";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, placeholder = "Search...", ...props }, ref) => {
        const { url } = usePage();

        const getSearchFromUrl = () => {
            const [, currentQueryString] = url.split('?');
            const params = qs.parse(currentQueryString || '');
            return typeof params.search === 'string' ? params.search : '';
        };

        const [searchValue, setSearchValue] = useState<string>(getSearchFromUrl);
        const isFirstRender = useRef(true);

        useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }

            const timer = setTimeout(() => {
                const [currentPathName, currentQueryString] = url.split('?');
                const params = qs.parse(currentQueryString || '');

                if (!searchValue) {
                    delete params.search;
                } else {
                    params.search = searchValue;
                }
                params.page = '1';

                router.get(currentPathName, params, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                });
            }, 300);

            return () => clearTimeout(timer);
        }, [searchValue]);

        return (
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    placeholder={placeholder}
                    type="search"
                    className={cn("pl-9 pr-4", className)}
                    {...props}
                    ref={ref}
                />
            </div>
        );
    }
);

SearchInput.displayName = "SearchInput";
export { SearchInput };