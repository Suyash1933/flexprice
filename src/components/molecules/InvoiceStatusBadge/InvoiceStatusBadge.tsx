/**
 * InvoiceStatusBadge — Maps invoice status strings to coloured chips with icons.
 *
 * Combines the Badge atom with status-specific icons and colours from
 * the statusLabels utility.
 *
 * @param status - Invoice status: "draft" | "finalized" | "paid" | "void" | "overdue" | "skipped"
 */
import { Badge } from "@/components/atoms/Badge/Badge";
import { getStatusConfig } from "@/utils/statusLabels";
import {
  FileEdit,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  SkipForward,
} from "lucide-react";
import type { ReactNode } from "react";

export interface InvoiceStatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_ICONS: Record<string, ReactNode> = {
  draft: <FileEdit className="h-3 w-3" />,
  finalized: <CheckCircle2 className="h-3 w-3" />,
  paid: <CheckCircle2 className="h-3 w-3" />,
  void: <XCircle className="h-3 w-3" />,
  overdue: <AlertTriangle className="h-3 w-3" />,
  skipped: <SkipForward className="h-3 w-3" />,
};

function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const config = getStatusConfig("invoice", status);
  const icon = STATUS_ICONS[status.toLowerCase()];

  return (
    <Badge variant={config.variant} className={className}>
      <span className="flex items-center gap-1">
        {icon}
        {config.label}
      </span>
    </Badge>
  );
}

export { InvoiceStatusBadge };
