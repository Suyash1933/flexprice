import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DataTable, type ColumnDef } from "./DataTable";
import { InvoiceStatusBadge } from "@/components/molecules/InvoiceStatusBadge/InvoiceStatusBadge";

/**
 * DataTable — Sortable, paginated data table with optional row virtualization.
 *
 * Supports loading skeletons, empty state, column sorting, pagination controls,
 * and virtual scrolling via @tanstack/react-virtual for 10,000+ row datasets.
 */

interface MockInvoice {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
  [key: string]: unknown;
}

const columns: ColumnDef<MockInvoice>[] = [
  { key: "id", header: "Invoice ID", sortable: true, width: "120px" },
  { key: "customer", header: "Customer", sortable: true },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    render: (row) => <span className="font-mono">{row.amount}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <InvoiceStatusBadge status={row.status} />,
  },
  { key: "date", header: "Date", sortable: true },
];

const statuses = ["draft", "finalized", "paid", "void", "overdue"];
const customers = ["Acme Corp", "Globex Inc", "Initech", "Hooli", "Pied Piper", "Umbrella Corp"];

function generateMockData(count: number): MockInvoice[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `INV-${String(i + 1).padStart(5, "0")}`,
    customer: customers[i % customers.length],
    amount: `$${(Math.random() * 10000).toFixed(2)}`,
    status: statuses[i % statuses.length],
    date: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  }));
}

const smallDataset = generateMockData(25);
const largeDataset = generateMockData(10000);

const meta = {
  title: "Molecules/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    virtualized: { control: "boolean" },
    loading: { control: "boolean" },
    pageSize: { control: { type: "number", min: 5, max: 50 } },
  },
  args: { onRowClick: fn() },
} satisfies Meta<typeof DataTable<MockInvoice>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: smallDataset,
    pageSize: 10,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No invoices found. Create your first invoice to get started.",
  },
};

export const Sortable: Story = {
  args: {
    columns,
    data: smallDataset,
    pageSize: 10,
  },
};

/**
 * Virtualized with 10,000 rows — demonstrates smooth scrolling performance.
 * Only renders the visible rows plus a small overscan buffer.
 */
export const Virtualized10kRows: Story = {
  args: {
    columns,
    data: largeDataset,
    virtualized: true,
    tableHeight: 500,
  },
};

export const SmallPageSize: Story = {
  args: {
    columns,
    data: smallDataset,
    pageSize: 5,
  },
};
