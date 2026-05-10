/**
 * MetricCard — KPI card for dashboards showing a label, value, and optional trend.
 *
 * @param label - Metric name (e.g. "Monthly Revenue")
 * @param value - Formatted value string (e.g. "$12,450")
 * @param trend - Percentage change (positive = up, negative = down)
 * @param trendLabel - Optional label for the trend (e.g. "vs last month")
 * @param icon - Optional icon element
 * @param loading - Shows a skeleton placeholder
 */
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ReactNode } from "react";

export interface MetricCardProps {
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
}

function MetricCard({ label, value, trend, trendLabel, icon, loading = false, className }: MetricCardProps) {
  if (loading) {
    return (
      <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const TrendIcon = trend === undefined || trend === 0 ? Minus : trend > 0 ? TrendingUp : TrendingDown;
  const trendColor = trend === undefined || trend === 0
    ? "text-muted-foreground"
    : trend > 0
      ? "text-emerald-600"
      : "text-red-600";

  return (
    <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {trend !== undefined && (
        <div className={cn("mt-2 flex items-center gap-1 text-xs", trendColor)}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span className="font-medium">{trend > 0 ? "+" : ""}{trend.toFixed(1)}%</span>
          {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

export { MetricCard };
