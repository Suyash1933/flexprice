/**
 * SidebarNav — Collapsible navigation sidebar with icon+label items.
 *
 * Supports nested sub-items, active route highlighting, and collapsed mode
 * that shows only icons.
 *
 * @param items - Navigation items with title, icon, url, and optional children
 * @param collapsed - Whether the sidebar is in icon-only mode
 * @param activeRoute - Current active route for highlighting
 * @param onNavigate - Callback when a nav item is clicked
 * @param onToggleCollapse - Callback to toggle collapsed state
 */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, PanelLeftClose, PanelLeft } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem {
  title: string;
  icon: ReactNode;
  url: string;
  items?: NavItem[];
}

export interface SidebarNavProps {
  items: NavItem[];
  collapsed?: boolean;
  activeRoute?: string;
  onNavigate?: (url: string) => void;
  onToggleCollapse?: () => void;
  logo?: ReactNode;
  className?: string;
}

function SidebarNav({
  items,
  collapsed = false,
  activeRoute = "/",
  onNavigate,
  onToggleCollapse,
  logo,
  className,
}: SidebarNavProps) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className={cn("flex h-14 items-center border-b px-4", collapsed && "justify-center px-2")}>
        {!collapsed && (logo ?? <span className="text-lg font-bold text-primary">FlexPrice</span>)}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            collapsed && "ml-0"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <NavItemRow
              key={item.url}
              item={item}
              collapsed={collapsed}
              activeRoute={activeRoute}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function NavItemRow({
  item,
  collapsed,
  activeRoute,
  onNavigate,
  depth = 0,
}: {
  item: NavItem;
  collapsed: boolean;
  activeRoute: string;
  onNavigate?: (url: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = activeRoute === item.url;
  const hasChildren = item.items && item.items.length > 0;

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          if (hasChildren && !collapsed) {
            setExpanded(!expanded);
          } else {
            onNavigate?.(item.url);
          }
        }}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          collapsed && "justify-center px-2",
          depth > 0 && "pl-9"
        )}
        title={collapsed ? item.title : undefined}
      >
        <span className="shrink-0">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.title}</span>
            {hasChildren && (
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 transition-transform", expanded && "rotate-180")}
              />
            )}
          </>
        )}
      </button>
      {hasChildren && expanded && !collapsed && (
        <ul className="mt-1 space-y-1">
          {item.items!.map((child) => (
            <NavItemRow
              key={child.url}
              item={child}
              collapsed={collapsed}
              activeRoute={activeRoute}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export { SidebarNav };
