import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";

/**
 * InvoiceStatusBadge — Maps invoice status strings to coloured chips with icons.
 *
 * Automatically selects the correct icon and colour variant based on the
 * invoice status value from the FlexPrice API.
 */
const meta = {
  title: "Molecules/InvoiceStatusBadge",
  component: InvoiceStatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["draft", "finalized", "paid", "void", "overdue", "skipped"],
    },
  },
} satisfies Meta<typeof InvoiceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Draft: Story = { args: { status: "draft" } };
export const Finalized: Story = { args: { status: "finalized" } };
export const Paid: Story = { args: { status: "paid" } };
export const Void: Story = { args: { status: "void" } };
export const Overdue: Story = { args: { status: "overdue" } };
export const Skipped: Story = { args: { status: "skipped" } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["draft", "finalized", "paid", "void", "overdue", "skipped"].map((status) => (
        <InvoiceStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
