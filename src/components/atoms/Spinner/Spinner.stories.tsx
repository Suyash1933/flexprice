import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

/**
 * Spinner / LoadingState — Animated loading indicator with configurable size and label.
 *
 * Used throughout FlexPrice for loading states, data fetching, and form submissions.
 */
const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 12, max: 96, step: 4 } },
    label: { control: "text" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: { size: 16 },
};

export const Large: Story = {
  args: { size: 48 },
};

export const WithLabel: Story = {
  args: { size: 32, label: "Loading data..." },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
      <Spinner size={64} />
    </div>
  ),
};
