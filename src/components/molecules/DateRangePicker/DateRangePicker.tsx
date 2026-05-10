/**
 * DateRangePicker — Date range selector for analytics filtering.
 *
 * Provides preset ranges (Last 7 days, 30 days, 90 days) and custom date selection.
 *
 * @param from - Start date
 * @param to - End date
 * @param onChange - Callback with new date range
 * @param presets - Whether to show preset range buttons
 */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown } from "lucide-react";
import { format, subDays } from "date-fns";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  presets?: boolean;
  className?: string;
}

const PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "Last 12 months", days: 365 },
];

function DateRangePicker({
  value,
  onChange,
  presets = true,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange>(
    value ?? { from: subDays(new Date(), 30), to: new Date() }
  );

  const handlePreset = (days: number) => {
    const newRange = { from: subDays(new Date(), days), to: new Date() };
    setRange(newRange);
    onChange?.(newRange);
    setOpen(false);
  };

  const handleDateChange = (field: "from" | "to", dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return;
    const newRange = { ...range, [field]: date };
    setRange(newRange);
    onChange?.(newRange);
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
      >
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>
          {format(range.from, "MMM d, yyyy")} – {format(range.to, "MMM d, yyyy")}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 w-72 rounded-md border bg-popover p-4 shadow-md">
          {presets && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.days}
                  type="button"
                  onClick={() => handlePreset(preset.days)}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">From</label>
              <input
                type="date"
                value={format(range.from, "yyyy-MM-dd")}
                onChange={(e) => handleDateChange("from", e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">To</label>
              <input
                type="date"
                value={format(range.to, "yyyy-MM-dd")}
                onChange={(e) => handleDateChange("to", e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { DateRangePicker };
