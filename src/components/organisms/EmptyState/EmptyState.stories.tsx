import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { EmptyState } from "./EmptyState";
import { FileText, Users, CreditCard, BarChart3 } from "lucide-react";

/**
 * EmptyState — Full-page empty state with icon, headline, subtext, and CTA button.
 *
 * Displayed when a page or data table has no records, guiding the user
 * to take their first action.
 */
const meta = {
  title: "Organisms/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    headline: { control: "text" },
    subtext: { control: "text" },
    ctaLabel: { control: "text" },
  },
  args: { onCta: fn() },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "No data yet",
    subtext: "Get started by creating your first item.",
    ctaLabel: "Create New",
  },
};

export const NoInvoices: Story = {
  args: {
    headline: "No invoices",
    subtext: "Invoices will appear here once you create subscriptions for your customers.",
    icon: <FileText className="h-10 w-10 text-muted-foreground" />,
    ctaLabel: "Create Invoice",
  },
};

export const NoCustomers: Story = {
  args: {
    headline: "No customers yet",
    subtext: "Add your first customer to start managing subscriptions and billing.",
    icon: <Users className="h-10 w-10 text-muted-foreground" />,
    ctaLabel: "Add Customer",
  },
};

export const NoBillingData: Story = {
  args: {
    headline: "No billing data",
    subtext: "Set up a pricing plan and start tracking usage to see billing information here.",
    icon: <CreditCard className="h-10 w-10 text-muted-foreground" />,
    ctaLabel: "Set Up Billing",
  },
};

export const NoUsageData: Story = {
  args: {
    headline: "No usage data",
    subtext: "Usage metrics will populate once your customers start using your product.",
    icon: <BarChart3 className="h-10 w-10 text-muted-foreground" />,
  },
};

export const WithoutCTA: Story = {
  args: {
    headline: "All caught up!",
    subtext: "There are no pending items to review.",
  },
};

/** Interaction test: CTA button click fires callback. */
export const CTAInteraction: Story = {
  args: {
    headline: "No items",
    subtext: "Click below to create one.",
    ctaLabel: "Create Item",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const ctaButton = canvas.getByRole("button", { name: /create item/i });
    await userEvent.click(ctaButton);
    await expect(args.onCta).toHaveBeenCalledTimes(1);
  },
};
