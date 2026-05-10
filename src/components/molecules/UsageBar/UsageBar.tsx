/**
 * UsageBar / MeterProgress — Labelled progress bar showing used vs. entitled units.
 *
 * Changes colour based on usage level: green (<60%), yellow (60-80%), red (>80%).
 *
 * @param used - Number of units consumed
 * @param entitled - Total units available
 * @param label - Meter label (e.g. "API Calls")
 * @param unit - Unit suffix (e.g. "calls", "GB")
 */
import { cn } from "@/lib/utils";

export interface UsageBarProps {
  used: number;
  entitled: number;
  label: string;
  unit?: string;
  className?: string;
}

function UsageBar({ used, entitled, label, unit = "units", className }: UsageBarProps) {
  const percentage = entitled > 0 ? Math.min((used / entitled) * 100, 100) : 0;
  const exceeded = used > entitled;

  const barColor =
    percentage >= 80 ? "bg-red-500" : percentage >= 60 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className={cn("text-muted-foreground", exceeded && "font-semibold text-red-600")}>
          {used.toLocaleString()} / {entitled.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={entitled}
          aria-label={`${label}: ${used} of ${entitled} ${unit} used`}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{percentage.toFixed(0)}% used</span>
        {exceeded && <span className="text-red-600 font-medium">Limit exceeded</span>}
      </div>
    </div>
  );
}

export { UsageBar };
