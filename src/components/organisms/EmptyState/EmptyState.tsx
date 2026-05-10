/**
 * EmptyState — Full-page empty state with icon, headline, subtext, and CTA button.
 *
 * Used when a page or section has no data to display (e.g. no invoices, no customers).
 *
 * @param headline - Main heading text
 * @param subtext - Descriptive text below the headline
 * @param icon - Optional icon or illustration
 * @param ctaLabel - Optional call-to-action button label
 * @param onCta - Callback when CTA button is clicked
 */
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  headline: string;
  subtext?: string;
  icon?: ReactNode;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

function EmptyState({
  headline,
  subtext,
  icon,
  ctaLabel,
  onCta,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="mb-4 rounded-full bg-muted p-4">
        {icon ?? <Inbox className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h2 className="text-xl font-semibold text-foreground">{headline}</h2>
      {subtext && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{subtext}</p>
      )}
      {ctaLabel && onCta && (
        <Button onClick={onCta} className="mt-6">
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}

export { EmptyState };
