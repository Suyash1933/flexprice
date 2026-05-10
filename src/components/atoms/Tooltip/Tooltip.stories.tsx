import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "@/components/atoms/Button/Button";
import { Info } from "lucide-react";

/**
 * Tooltip — Informational tooltip shown on hover with configurable placement and delay.
 *
 * Built on Radix UI Tooltip for accessibility and keyboard support.
 */
const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    side: { control: "select", options: ["top", "bottom", "left", "right"] },
    delayMs: { control: { type: "number", min: 0, max: 2000, step: 100 } },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button variant="outline">Hover me</Button>,
  },
};

export const Top: Story = {
  args: {
    content: "Tooltip on top",
    side: "top",
    children: <Button variant="outline">Top</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip on bottom",
    side: "bottom",
    children: <Button variant="outline">Bottom</Button>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip on left",
    side: "left",
    children: <Button variant="outline">Left</Button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip on right",
    side: "right",
    children: <Button variant="outline">Right</Button>,
  },
};

export const WithDelay: Story = {
  args: {
    content: "This appears after 1 second",
    delayMs: 1000,
    children: <Button variant="outline">Slow tooltip</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    content: "Credits are consumed when API calls are made",
    children: (
      <span className="inline-flex cursor-help items-center gap-1 text-sm text-muted-foreground">
        Credits <Info className="h-3.5 w-3.5" />
      </span>
    ),
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
          <Button variant="outline" size="sm">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
