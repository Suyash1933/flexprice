import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { SelectDropdown } from "./Select";

/**
 * SelectDropdown — Single-select dropdown with optional search filtering.
 *
 * Used for choosing plans, statuses, customers, and other entities
 * throughout the FlexPrice UI.
 */
const meta = {
  title: "Atoms/Select",
  component: SelectDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const planOptions = [
  { label: "Free Tier", value: "free" },
  { label: "Starter", value: "starter" },
  { label: "Professional", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Trialing", value: "trialing" },
  { label: "Past Due", value: "past_due" },
  { label: "Paused", value: "paused" },
];

export const Default: Story = {
  args: { options: planOptions, placeholder: "Select a plan..." },
};

export const WithSearch: Story = {
  args: { options: planOptions, searchable: true, placeholder: "Search plans..." },
};

export const Disabled: Story = {
  args: { options: planOptions, disabled: true, placeholder: "Disabled" },
};

export const WithSelection: Story = {
  args: { options: statusOptions, value: "active", placeholder: "Select status..." },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `opt-${i + 1}`,
    })),
    searchable: true,
    placeholder: "Search from 20 options...",
  },
};

/** Interaction test: open dropdown and select an option. */
export const SelectInteraction: Story = {
  args: { options: planOptions, placeholder: "Select a plan..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /select a plan/i });
    await userEvent.click(trigger);
    const option = await canvas.findByText("Professional");
    await userEvent.click(option);
    await expect(canvas.getByText("Professional")).toBeInTheDocument();
  },
};
