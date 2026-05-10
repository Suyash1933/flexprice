import { describe, it, expect } from "vitest";
import {
  calculateVolumeTieredPrice,
  calculateGraduatedPrice,
  formatTierRange,
  formatCurrency,
  type PriceTier,
} from "./tierPricing";

const tiers: PriceTier[] = [
  { from: 1, to: 100, unitPrice: 0.50 },
  { from: 101, to: 1000, unitPrice: 0.30 },
  { from: 1001, to: null, unitPrice: 0.10 },
];

const tiersWithFlat: PriceTier[] = [
  { from: 1, to: 100, unitPrice: 0.50, flatFee: 10 },
  { from: 101, to: 1000, unitPrice: 0.30, flatFee: 5 },
  { from: 1001, to: null, unitPrice: 0.10, flatFee: 0 },
];

describe("calculateVolumeTieredPrice", () => {
  it("returns 0 for zero quantity", () => {
    expect(calculateVolumeTieredPrice(0, tiers)).toBe(0);
  });

  it("returns 0 for empty tiers", () => {
    expect(calculateVolumeTieredPrice(50, [])).toBe(0);
  });

  it("applies the matching tier rate to all units", () => {
    expect(calculateVolumeTieredPrice(50, tiers)).toBe(50 * 0.50);
    expect(calculateVolumeTieredPrice(500, tiers)).toBe(500 * 0.30);
    expect(calculateVolumeTieredPrice(5000, tiers)).toBe(5000 * 0.10);
  });

  it("uses last tier for quantities beyond all ranges", () => {
    expect(calculateVolumeTieredPrice(50000, tiers)).toBe(50000 * 0.10);
  });

  it("includes flat fee from the matching tier", () => {
    expect(calculateVolumeTieredPrice(50, tiersWithFlat)).toBe(50 * 0.50 + 10);
  });
});

describe("calculateGraduatedPrice", () => {
  it("returns 0 for zero quantity", () => {
    expect(calculateGraduatedPrice(0, tiers)).toBe(0);
  });

  it("calculates correctly within first tier", () => {
    expect(calculateGraduatedPrice(50, tiers)).toBe(50 * 0.50);
  });

  it("stacks pricing across multiple tiers", () => {
    // 100 units @ $0.50 + 50 units @ $0.30
    expect(calculateGraduatedPrice(150, tiers)).toBe(100 * 0.50 + 50 * 0.30);
  });

  it("includes flat fees per tier", () => {
    // 100 units @ $0.50 + $10 flat + 50 units @ $0.30 + $5 flat
    expect(calculateGraduatedPrice(150, tiersWithFlat)).toBe(100 * 0.50 + 10 + 50 * 0.30 + 5);
  });
});

describe("formatTierRange", () => {
  it("formats bounded range", () => {
    expect(formatTierRange(1, 100)).toBe("1 – 100");
  });

  it("formats unbounded range with null", () => {
    expect(formatTierRange(1001, null)).toBe("1001+");
  });
});

describe("formatCurrency", () => {
  it("formats USD", () => {
    expect(formatCurrency(25)).toBe("$25.00");
  });

  it("formats EUR", () => {
    const result = formatCurrency(25, "EUR");
    expect(result).toContain("25.00");
  });

  it("handles small decimal amounts", () => {
    expect(formatCurrency(0.0025)).toBe("$0.0025");
  });
});
