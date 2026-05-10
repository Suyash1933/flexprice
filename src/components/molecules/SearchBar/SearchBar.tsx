/**
 * SearchBar — Debounced search input with clear button.
 *
 * @param onSearch - Callback fired after debounce with the current query string
 * @param debounceMs - Debounce delay in ms (default 300)
 * @param placeholder - Input placeholder text
 * @param initialValue - Initial search value
 * @param loading - Show loading indicator
 */
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { Search, X, Loader2 } from "lucide-react";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  debounceMs?: number;
  placeholder?: string;
  initialValue?: string;
  loading?: boolean;
  className?: string;
}

function SearchBar({
  onSearch,
  debounceMs = 300,
  placeholder = "Search...",
  initialValue = "",
  loading = false,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const debouncedSearch = useDebouncedCallback((query: string) => {
    onSearch(query);
  }, debounceMs);

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : value ? (
          <button
            type="button"
            onClick={() => setValue("")}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export { SearchBar };
