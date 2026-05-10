/**
 * Badge / StatusChip — Displays a coloured label for entity statuses.
 *
 * Maps status strings (e.g. "active", "paid", "void") to semantic colour variants.
 * Can be used standalone or composed into InvoiceStatusBadge.
 *
 * @param variant - Visual style: "default" | "success" | "warning" | "destructive" | "secondary"
 * @param children - Badge content (text label)
 */
import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border border-amber-200",
        destructive: "bg-red-50 text-red-700 border border-red-200",
        secondary: "bg-gray-100 text-gray-600 border border-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
