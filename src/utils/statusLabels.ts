/** Maps status enum values to human-readable labels and color variants. */

export type StatusVariant = "default" | "success" | "warning" | "destructive" | "secondary";

interface StatusConfig {
  label: string;
  variant: StatusVariant;
}

const INVOICE_STATUS_MAP: Record<string, StatusConfig> = {
  draft: { label: "Draft", variant: "secondary" },
  finalized: { label: "Finalized", variant: "default" },
  paid: { label: "Paid", variant: "success" },
  void: { label: "Void", variant: "destructive" },
  overdue: { label: "Overdue", variant: "warning" },
  skipped: { label: "Skipped", variant: "secondary" },
};

const PLAN_STATUS_MAP: Record<string, StatusConfig> = {
  active: { label: "Active", variant: "success" },
  archived: { label: "Archived", variant: "secondary" },
  draft: { label: "Draft", variant: "default" },
};

const SUBSCRIPTION_STATUS_MAP: Record<string, StatusConfig> = {
  active: { label: "Active", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  trialing: { label: "Trialing", variant: "warning" },
  past_due: { label: "Past Due", variant: "destructive" },
  paused: { label: "Paused", variant: "secondary" },
};

export function getInvoiceStatusLabel(status: string): string {
  return INVOICE_STATUS_MAP[status.toLowerCase()]?.label ?? status;
}

export function getInvoiceStatusVariant(status: string): StatusVariant {
  return INVOICE_STATUS_MAP[status.toLowerCase()]?.variant ?? "default";
}

export function getPlanStatusLabel(status: string): string {
  return PLAN_STATUS_MAP[status.toLowerCase()]?.label ?? status;
}

export function getPlanStatusVariant(status: string): StatusVariant {
  return PLAN_STATUS_MAP[status.toLowerCase()]?.variant ?? "default";
}

export function getSubscriptionStatusLabel(status: string): string {
  return SUBSCRIPTION_STATUS_MAP[status.toLowerCase()]?.label ?? status;
}

export function getSubscriptionStatusVariant(status: string): StatusVariant {
  return SUBSCRIPTION_STATUS_MAP[status.toLowerCase()]?.variant ?? "default";
}

export function getStatusConfig(
  type: "invoice" | "plan" | "subscription",
  status: string
): StatusConfig {
  const map = {
    invoice: INVOICE_STATUS_MAP,
    plan: PLAN_STATUS_MAP,
    subscription: SUBSCRIPTION_STATUS_MAP,
  }[type];
  return map[status.toLowerCase()] ?? { label: status, variant: "default" as StatusVariant };
}
