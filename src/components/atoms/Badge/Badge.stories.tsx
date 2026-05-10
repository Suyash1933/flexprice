import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

/**
 * Badge / StatusChip — Displays coloured labels for entity statuses.
 *
 * Used across FlexPrice for invoice status, plan status, and subscription status indicators.
 */
const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "destructive", "secondary"],
      description: "Colour variant matching the status severity",
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Default", variant: "default" },
};

export const Success: Story = {
  args: { children: "Active", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Trialing", variant: "warning" },
};

export const Destructive: Story = {
  args: { children: "Void", variant: "destructive" },
};

export const Secondary: Story = {
  args: { children: "Archived", variant: "secondary" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Finalized</Badge>
      <Badge variant="success">Paid</Badge>
      <Badge variant="warning">Overdue</Badge>
      <Badge variant="destructive">Void</Badge>
      <Badge variant="secondary">Draft</Badge>
    </div>
  ),
};

export const PlanStatuses: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="secondary">Archived</Badge>
      <Badge variant="default">Draft</Badge>
    </div>
  ),
};

export const SubscriptionStatuses: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Trialing</Badge>
      <Badge variant="destructive">Cancelled</Badge>
      <Badge variant="destructive">Past Due</Badge>
      <Badge variant="secondary">Paused</Badge>
    </div>
  ),
};
