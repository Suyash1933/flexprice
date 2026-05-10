/** Tier pricing calculation utilities for volume and graduated pricing models. */

export interface PriceTier {
  from: number;
  to: number | null;
  unitPrice: number;
  flatFee?: number;
}

/**
 * Calculates price using volume/slab pricing — the tier that contains the
 * total quantity determines the per-unit price for ALL units.
 */
export function calculateVolumeTieredPrice(quantity: number, tiers: PriceTier[]): number {
  if (quantity <= 0 || tiers.length === 0) return 0;

  const sorted = [...tiers].sort((a, b) => a.from - b.from);
  for (const tier of sorted) {
    const upper = tier.to ?? Infinity;
    if (quantity >= tier.from && quantity <= upper) {
      return quantity * tier.unitPrice + (tier.flatFee ?? 0);
    }
  }
  const last = sorted[sorted.length - 1];
  return quantity * last.unitPrice + (last.flatFee ?? 0);
}

/**
 * Calculates price using graduated pricing — each tier's rate applies only
 * to the units within that tier's range.
 */
export function calculateGraduatedPrice(quantity: number, tiers: PriceTier[]): number {
  if (quantity <= 0 || tiers.length === 0) return 0;

  const sorted = [...tiers].sort((a, b) => a.from - b.from);
  let total = 0;
  let remaining = quantity;

  for (const tier of sorted) {
    if (remaining <= 0) break;
    const upper = tier.to ?? Infinity;
    const tierStart = tier.from;
    const tierEnd = Math.min(upper, tierStart + remaining - 1);
    const unitsInTier = tierEnd - tierStart + 1;

    total += unitsInTier * tier.unitPrice + (tier.flatFee ?? 0);
    remaining -= unitsInTier;
  }

  return total;
}

/** Formats a tier range for display, e.g. "1 – 100" or "101+". */
export function formatTierRange(from: number, to: number | null): string {
  if (to === null || to === Infinity) return `${from}+`;
  return `${from} – ${to}`;
}

/** Formats a currency value for display. */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}
