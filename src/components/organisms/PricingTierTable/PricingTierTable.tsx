/**
 * PricingTierTable — Displays tiered or graduated pricing in a readable table.
 *
 * Shows unit ranges, per-unit prices, flat fees, and calculates example costs.
 *
 * @param tiers - Array of pricing tiers with from, to, unitPrice, flatFee
 * @param mode - Pricing model: "volume" (one tier applies) or "graduated" (stacked tiers)
 * @param currency - ISO currency code (default "USD")
 */
import { cn } from "@/lib/utils";
import type { PriceTier } from "@/utils/tierPricing";
import {
  formatTierRange,
  formatCurrency,
  calculateVolumeTieredPrice,
  calculateGraduatedPrice,
} from "@/utils/tierPricing";

export interface PricingTierTableProps {
  tiers: PriceTier[];
  mode: "volume" | "graduated";
  currency?: string;
  exampleQuantity?: number;
  className?: string;
}

function PricingTierTable({
  tiers,
  mode,
  currency = "USD",
  exampleQuantity,
  className,
}: PricingTierTableProps) {
  const sorted = [...tiers].sort((a, b) => a.from - b.from);
  const calcFn = mode === "volume" ? calculateVolumeTieredPrice : calculateGraduatedPrice;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">
          {mode === "volume" ? "Volume" : "Graduated"} Pricing
        </h3>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {sorted.length} tier{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Unit Range
              </th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                Per Unit
              </th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                Flat Fee
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((tier, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-3 text-sm font-medium">
                  {formatTierRange(tier.from, tier.to)}
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  {formatCurrency(tier.unitPrice, currency)}
                </td>
                <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                  {tier.flatFee ? formatCurrency(tier.flatFee, currency) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {exampleQuantity !== undefined && (
        <div className="rounded-md bg-muted/50 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Example: <strong className="text-foreground">{exampleQuantity.toLocaleString()} units</strong>
            {" → "}
            <strong className="text-foreground">
              {formatCurrency(calcFn(exampleQuantity, tiers), currency)}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

export { PricingTierTable };
