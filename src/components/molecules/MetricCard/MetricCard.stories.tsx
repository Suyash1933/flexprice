import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "./MetricCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

/**
 * MetricCard — KPI dashboard card showing a metric label, value, and trend indicator.
 *
 * Displays key business metrics like revenue, customer count, and usage with
 * colour-coded trend arrows.
 */
const meta = {
  title: "Molecules/MetricCard",
  component: MetricCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    trend: { control: { type: "number", min: -100, max: 100, step: 0.5 } },
    loading: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Monthly Revenue",
    value: "$12,450",
    trend: 12.5,
    trendLabel: "vs last month",
    icon: <DollarSign className="h-4 w-4" />,
  },
};

export const TrendUp: Story = {
  args: {
    label: "Active Customers",
    value: "1,234",
    trend: 8.2,
    trendLabel: "vs last month",
    icon: <Users className="h-4 w-4" />,
  },
};

export const TrendDown: Story = {
  args: {
    label: "Churn Rate",
    value: "3.2%",
    trend: -1.5,
    trendLabel: "vs last month",
    icon: <Activity className="h-4 w-4" />,
  },
};

export const NoTrend: Story = {
  args: {
    label: "Total Invoices",
    value: "456",
    icon: <CreditCard className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    label: "",
    value: "",
    loading: true,
  },
};

export const DashboardGrid: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        label="Monthly Revenue"
        value="$12,450"
        trend={12.5}
        trendLabel="vs last month"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        label="Active Customers"
        value="1,234"
        trend={8.2}
        trendLabel="vs last month"
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        label="Open Invoices"
        value="23"
        trend={-5.0}
        trendLabel="vs last month"
        icon={<CreditCard className="h-4 w-4" />}
      />
      <MetricCard
        label="API Usage"
        value="2.1M"
        trend={15.3}
        trendLabel="vs last month"
        icon={<Activity className="h-4 w-4" />}
      />
    </div>
  ),
};
