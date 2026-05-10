/**
 * DataTable — Sortable, paginated data table with virtualization support.
 *
 * Supports loading skeletons, empty state, column sorting, pagination,
 * and optional row virtualization via @tanstack/react-virtual for
 * rendering 10,000+ rows smoothly.
 *
 * @param columns - Column definitions with key, header, render, sortable
 * @param data - Array of row data
 * @param virtualized - Enable virtual scrolling (recommended for >500 rows)
 * @param rowHeight - Estimated row height for virtualizer (default 48)
 * @param loading - Shows skeleton rows
 * @param emptyMessage - Message when data is empty
 * @param pageSize - Rows per page for pagination (default 10, ignored when virtualized)
 */
import { useState, useRef, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  virtualized?: boolean;
  rowHeight?: number;
  loading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  className?: string;
  tableHeight?: number;
  onRowClick?: (row: T) => void;
}

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  virtualized = false,
  rowHeight = 48,
  loading = false,
  emptyMessage = "No data available.",
  pageSize = 10,
  className,
  tableHeight = 500,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null || bVal == null) return 0;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const paginatedData = virtualized
    ? sortedData
    : sortedData.slice(page * pageSize, (page + 1) * pageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey]);

  const virtualizer = useVirtualizer({
    count: virtualized ? sortedData.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
    enabled: virtualized,
  });

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />;
    return sortDir === "asc"
      ? <ArrowUp className="ml-1 h-3.5 w-3.5" />
      : <ArrowDown className="ml-1 h-3.5 w-3.5" />;
  };

  if (loading) {
    return (
      <div className={cn("rounded-lg border", className)}>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col) => (
                <th key={col.key} className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn("rounded-lg border", className)}>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col) => (
                <th key={col.key} className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  const renderRow = (row: T, index: number) => (
    <tr
      key={index}
      className={cn("border-b hover:bg-muted/50 transition-colors", onRowClick && "cursor-pointer")}
      onClick={() => onRowClick?.(row)}
    >
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-3 text-sm" style={col.width ? { width: col.width } : undefined}>
          {col.render ? col.render(row) : String(row[col.key] ?? "")}
        </td>
      ))}
    </tr>
  );

  return (
    <div className={cn("rounded-lg border", className)}>
      {virtualized ? (
        <>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "h-10 px-4 text-left text-xs font-medium text-muted-foreground",
                      col.sortable && "cursor-pointer select-none hover:text-foreground"
                    )}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="flex items-center">
                      {col.header}
                      {col.sortable && <SortIcon colKey={col.key} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <div ref={parentRef} style={{ height: tableHeight, overflow: "auto" }}>
            <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const row = sortedData[virtualRow.index];
                return (
                  <div
                    key={virtualRow.index}
                    className={cn("flex border-b hover:bg-muted/50 transition-colors", onRowClick && "cursor-pointer")}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <div
                        key={col.key}
                        className="flex items-center px-4 text-sm flex-1"
                        style={col.width ? { width: col.width, flex: "none" } : undefined}
                      >
                        {col.render ? col.render(row) : String(row[col.key] ?? "")}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "h-10 px-4 text-left text-xs font-medium text-muted-foreground",
                      col.sortable && "cursor-pointer select-none hover:text-foreground"
                    )}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="flex items-center">
                      {col.header}
                      {col.sortable && <SortIcon colKey={col.key} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => renderRow(row, page * pageSize + i))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Page {page + 1} of {totalPages} ({data.length} rows)
              </p>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { DataTable };
