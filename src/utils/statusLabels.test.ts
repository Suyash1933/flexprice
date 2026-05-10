import { describe, it, expect } from "vitest";
import {
  getInvoiceStatusLabel,
  getInvoiceStatusVariant,
  getPlanStatusLabel,
  getPlanStatusVariant,
  getSubscriptionStatusLabel,
  getStatusConfig,
} from "./statusLabels";

describe("statusLabels", () => {
  describe("getInvoiceStatusLabel", () => {
    it("returns human-readable label for known statuses", () => {
      expect(getInvoiceStatusLabel("draft")).toBe("Draft");
      expect(getInvoiceStatusLabel("paid")).toBe("Paid");
      expect(getInvoiceStatusLabel("void")).toBe("Void");
      expect(getInvoiceStatusLabel("overdue")).toBe("Overdue");
    });

    it("handles case-insensitive input", () => {
      expect(getInvoiceStatusLabel("PAID")).toBe("Paid");
      expect(getInvoiceStatusLabel("Draft")).toBe("Draft");
    });

    it("returns raw status for unknown values", () => {
      expect(getInvoiceStatusLabel("unknown_status")).toBe("unknown_status");
    });
  });

  describe("getInvoiceStatusVariant", () => {
    it("returns correct variant for each status", () => {
      expect(getInvoiceStatusVariant("paid")).toBe("success");
      expect(getInvoiceStatusVariant("void")).toBe("destructive");
      expect(getInvoiceStatusVariant("overdue")).toBe("warning");
      expect(getInvoiceStatusVariant("draft")).toBe("secondary");
    });

    it("returns default for unknown status", () => {
      expect(getInvoiceStatusVariant("xyz")).toBe("default");
    });
  });

  describe("getPlanStatusLabel", () => {
    it("returns correct labels", () => {
      expect(getPlanStatusLabel("active")).toBe("Active");
      expect(getPlanStatusLabel("archived")).toBe("Archived");
    });
  });

  describe("getPlanStatusVariant", () => {
    it("returns success for active", () => {
      expect(getPlanStatusVariant("active")).toBe("success");
    });
  });

  describe("getSubscriptionStatusLabel", () => {
    it("returns correct labels", () => {
      expect(getSubscriptionStatusLabel("active")).toBe("Active");
      expect(getSubscriptionStatusLabel("cancelled")).toBe("Cancelled");
      expect(getSubscriptionStatusLabel("past_due")).toBe("Past Due");
    });
  });

  describe("getStatusConfig", () => {
    it("returns label and variant for different types", () => {
      const invoiceConfig = getStatusConfig("invoice", "paid");
      expect(invoiceConfig.label).toBe("Paid");
      expect(invoiceConfig.variant).toBe("success");

      const planConfig = getStatusConfig("plan", "active");
      expect(planConfig.label).toBe("Active");
      expect(planConfig.variant).toBe("success");

      const subConfig = getStatusConfig("subscription", "trialing");
      expect(subConfig.label).toBe("Trialing");
      expect(subConfig.variant).toBe("warning");
    });
  });
});
