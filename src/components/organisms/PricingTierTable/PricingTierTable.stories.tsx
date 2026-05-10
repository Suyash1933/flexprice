import type { Meta, StoryObj } from "@storybook/react";
import { PricingTierTable } from "./PricingTierTable";

/**
 * PricingTierTable — Displays tiered or graduated pricing in a readable table.
 *
 * Supports both volume pricing (one tier applies to all units) and
 * graduated pricing (each tier's rate applies to units in that range).
 */
const meta = {
  title: "Organisms/PricingTierTable",
  component: PricingTierTable,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "select", options: ["volume", "graduated"] },
    currency: { control: "text" },
    exampleQuantity: { control: { type: "number", min: 0, max: 100000 } },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PricingTierTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const volumeTiers = [
  { from: 1, to: 1000, unitPrice: 0.10 },
  { from: 1001, to: 5000, unitPrice: 0.08 },
  { from: 5001, to: 10000, unitPrice: 0.05 },
  { from: 10001, to: null, unitPrice: 0.03 },
];

const graduatedTiers = [
  { from: 1, to: 100, unitPrice: 0.50, flatFee: 10 },
  { from: 101, to: 1000, unitPrice: 0.30, flatFee: 0 },
  { from: 1001, to: 10000, unitPrice: 0.10, flatFee: 0 },
  { from: 10001, to: null, unitPrice: 0.05, flatFee: 0 },
];

export const VolumeTiers: Story = {
  args: {
    tiers: volumeTiers,
    mode: "volume",
    exampleQuantity: 3000,
  },
};

export const GraduatedTiers: Story = {
  args: {
    tiers: graduatedTiers,
    mode: "graduated",
    exampleQuantity: 5000,
  },
};

export const SingleTier: Story = {
  args: {
    tiers: [{ from: 1, to: null, unitPrice: 0.25 }],
    mode: "volume",
    exampleQuantity: 100,
  },
};

export const ManyTiers: Story = {
  args: {
    tiers: [
      { from: 1, to: 100, unitPrice: 1.00 },
      { from: 101, to: 500, unitPrice: 0.80 },
      { from: 501, to: 1000, unitPrice: 0.60 },
      { from: 1001, to: 5000, unitPrice: 0.40 },
      { from: 5001, to: 10000, unitPrice: 0.20 },
      { from: 10001, to: 50000, unitPrice: 0.10 },
      { from: 50001, to: null, unitPrice: 0.05 },
    ],
    mode: "graduated",
    exampleQuantity: 25000,
  },
};

export const EuroCurrency: Story = {
  args: {
    tiers: volumeTiers,
    mode: "volume",
    currency: "EUR",
    exampleQuantity: 2000,
  },
};
