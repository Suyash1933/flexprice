import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Input } from "./Input";

/**
 * Input — Form input field with support for labels, error states,
 * currency prefixes, and different input types.
 */
const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "email", "password"],
    },
    label: { control: "text" },
    error: { control: "text" },
    prefix: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
  args: { label: "Email Address", placeholder: "you@example.com", type: "email" },
};

export const WithError: Story = {
  args: { label: "Amount", error: "Amount must be greater than 0", value: "-5", type: "number" },
};

export const WithCurrencyPrefix: Story = {
  args: { label: "Unit Price", prefix: "$", placeholder: "0.00", type: "number" },
};

export const Disabled: Story = {
  args: { label: "Read Only", value: "Cannot edit", disabled: true },
};

export const Password: Story = {
  args: { label: "Password", type: "password", placeholder: "Enter password..." },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Name" placeholder="John Doe" />
      <Input label="Price" prefix="$" placeholder="0.00" type="number" />
      <Input label="Email" error="Invalid email" value="invalid" type="email" />
      <Input label="Disabled" disabled value="Locked" />
    </div>
  ),
};

/** Interaction test: type into input and verify value appears. */
export const TypeInteraction: Story = {
  args: { label: "Username", placeholder: "Enter username" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter username");
    await userEvent.clear(input);
    await userEvent.type(input, "flexprice_user");
    await expect(input).toHaveValue("flexprice_user");
  },
};
