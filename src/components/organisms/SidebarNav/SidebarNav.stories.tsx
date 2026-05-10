import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { SidebarNav, type NavItem } from "./SidebarNav";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  FileText,
  BarChart3,
  Settings,
  Zap,
  Package,
  Wallet,
} from "lucide-react";

/**
 * SidebarNav — Collapsible navigation sidebar with icon+label items.
 *
 * Supports nested sub-items, active route highlighting, and a collapsed
 * icon-only mode. Used as the main navigation in the FlexPrice app.
 */

const navItems: NavItem[] = [
  { title: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" />, url: "/" },
  { title: "Customers", icon: <Users className="h-4 w-4" />, url: "/customers" },
  {
    title: "Billing",
    icon: <CreditCard className="h-4 w-4" />,
    url: "/billing",
    items: [
      { title: "Invoices", icon: <FileText className="h-4 w-4" />, url: "/billing/invoices" },
      { title: "Subscriptions", icon: <Package className="h-4 w-4" />, url: "/billing/subscriptions" },
      { title: "Credits", icon: <Wallet className="h-4 w-4" />, url: "/billing/credits" },
    ],
  },
  { title: "Plans", icon: <Zap className="h-4 w-4" />, url: "/plans" },
  { title: "Usage", icon: <BarChart3 className="h-4 w-4" />, url: "/usage" },
  { title: "Settings", icon: <Settings className="h-4 w-4" />, url: "/settings" },
];

const meta = {
  title: "Organisms/SidebarNav",
  component: SidebarNav,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
    activeRoute: { control: "text" },
  },
  args: {
    onNavigate: fn(),
    onToggleCollapse: fn(),
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] flex">
        <Story />
        <div className="flex-1 bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">Page content area</p>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: navItems, activeRoute: "/" },
};

export const Collapsed: Story = {
  args: { items: navItems, collapsed: true, activeRoute: "/" },
};

export const WithActiveRoute: Story = {
  args: { items: navItems, activeRoute: "/plans" },
};

export const WithSubItems: Story = {
  args: { items: navItems, activeRoute: "/billing/invoices" },
};

/** Interaction test: click a nav item and verify callback fires. */
export const NavigateInteraction: Story = {
  args: { items: navItems, activeRoute: "/" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const plansLink = canvas.getByText("Plans");
    await userEvent.click(plansLink);
    await expect(args.onNavigate).toHaveBeenCalledWith("/plans");
  },
};
