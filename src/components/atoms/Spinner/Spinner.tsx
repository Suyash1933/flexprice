/**
 * Spinner / LoadingState — Animated loading indicator.
 *
 * @param size - Pixel size of the spinner (default 24)
 * @param className - Additional CSS classes
 * @param label - Optional accessible label (default "Loading")
 */
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

function Spinner({ size = 24, className, label }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2" role="status">
      <Loader2
        className={cn("animate-spin text-primary", className)}
        style={{ width: size, height: size }}
      />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
      <span className="sr-only">Loading</span>
    </div>
  );
}

export { Spinner };
