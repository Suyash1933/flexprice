import type { Meta, StoryObj } from "@storybook/react";
import { UsageBar } from "./UsageBar";

/**
 * UsageBar / MeterProgress — Labelled progress bar showing used vs. entitled units.
 *
 * Colour changes based on usage: green (<60%), yellow (60-80%), red (>80%).
 * Shows "Limit exceeded" when usage surpasses the entitlement.
 */
const meta = {
  title: "Molecules/UsageBar",
  component: UsageBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    used: { control: { type: "number", min: 0, max: 100000 } },
    entitled: { control: { type: "number", min: 0, max: 100000 } },
    unit: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UsageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "API Calls", used: 3500, entitled: 10000, unit: "calls" },
};

export const LowUsage: Story = {
  args: { label: "Storage", used: 2, entitled: 50, unit: "GB" },
};

export const MediumUsage: Story = {
  args: { label: "API Calls", used: 7000, entitled: 10000, unit: "calls" },
};

export const HighUsage: Story = {
  args: { label: "Events", used: 9200, entitled: 10000, unit: "events" },
};

export const Exceeded: Story = {
  args: { label: "Seats", used: 12, entitled: 10, unit: "seats" },
};

export const Zero: Story = {
  args: { label: "Webhooks", used: 0, entitled: 1000, unit: "calls" },
};

export const MultipleMeters: Story = {
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-6">
      <UsageBar label="API Calls" used={3500} entitled={10000} unit="calls" />
      <UsageBar label="Storage" used={42} entitled={50} unit="GB" />
      <UsageBar label="Seats" used={8} entitled={10} unit="seats" />
      <UsageBar label="Events" used={100000} entitled={100000} unit="events" />
    </div>
  ),
};
