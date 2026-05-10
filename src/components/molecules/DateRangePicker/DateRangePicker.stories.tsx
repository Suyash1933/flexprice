import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DateRangePicker } from "./DateRangePicker";
import { subDays } from "date-fns";

/**
 * DateRangePicker — Date range selector for analytics filtering.
 *
 * Provides preset range shortcuts (7/30/90/365 days) and custom
 * date inputs for flexible time range selection.
 */
const meta = {
  title: "Molecules/DateRangePicker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    presets: { control: "boolean", description: "Show preset range buttons" },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomRange: Story = {
  args: {
    value: { from: subDays(new Date(), 90), to: new Date() },
  },
};

export const WithoutPresets: Story = {
  args: { presets: false },
};

export const SevenDays: Story = {
  args: {
    value: { from: subDays(new Date(), 7), to: new Date() },
  },
};
