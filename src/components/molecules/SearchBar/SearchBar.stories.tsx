import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { SearchBar } from "./SearchBar";

/**
 * SearchBar — Debounced search input with clear button and loading state.
 *
 * Fires the onSearch callback after a configurable debounce delay,
 * preventing excessive API calls while the user is typing.
 */
const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    debounceMs: { control: { type: "number", min: 0, max: 2000, step: 100 } },
    loading: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { onSearch: fn() },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Search customers..." },
};

export const WithInitialValue: Story = {
  args: { initialValue: "acme corp", placeholder: "Search..." },
};

export const Loading: Story = {
  args: { loading: true, initialValue: "searching..." },
};

export const CustomDebounce: Story = {
  args: { debounceMs: 1000, placeholder: "1 second debounce..." },
};

/** Interaction test: type into search bar and verify text appears. */
export const TypeInteraction: Story = {
  args: { placeholder: "Search..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await userEvent.type(input, "invoice");
    await expect(input).toHaveValue("invoice");
  },
};

/** Interaction test: clear button removes text. */
export const ClearInteraction: Story = {
  args: { initialValue: "clear me", placeholder: "Search..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearBtn = canvas.getByRole("button", { name: /clear/i });
    await userEvent.click(clearBtn);
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveValue("");
  },
};
