/**
 * useFilterStore — Zustand-based filter persistence for data tables.
 *
 * Stores active filters per route in sessionStorage so they survive
 * page navigation but not browser restarts. Syncs a shallow fingerprint
 * (filter count) to the URL for bookmarkability without bloat.
 *
 * @example
 * const { filters, setFilter, resetFilters } = useFilterStore("invoices");
 * setFilter("status", "paid");
 * setFilter("dateRange", { from: "2024-01-01", to: "2024-12-31" });
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type FilterValue = string | number | boolean | { from: string; to: string } | string[];

interface FilterStoreState {
  /** Route-keyed filter maps. */
  filtersByRoute: Record<string, Record<string, FilterValue>>;
  setFilter: (route: string, key: string, value: FilterValue) => void;
  resetFilters: (route: string) => void;
  getFilters: (route: string) => Record<string, FilterValue>;
}

function syncUrlFingerprint(route: string, filters: Record<string, FilterValue>) {
  if (typeof window === "undefined") return;
  const count = Object.keys(filters).length;
  const url = new URL(window.location.href);
  if (count > 0) {
    url.searchParams.set("f", `${route}:${count}`);
  } else {
    url.searchParams.delete("f");
  }
  window.history.replaceState({}, "", url.toString());
}

export const useFilterStoreBase = create<FilterStoreState>()(
  persist(
    (set, get) => ({
      filtersByRoute: {},

      setFilter: (route: string, key: string, value: FilterValue) => {
        set((state) => {
          const routeFilters = { ...state.filtersByRoute[route], [key]: value };
          const newState = {
            filtersByRoute: { ...state.filtersByRoute, [route]: routeFilters },
          };
          syncUrlFingerprint(route, routeFilters);
          return newState;
        });
      },

      resetFilters: (route: string) => {
        set((state) => {
          const { [route]: _, ...rest } = state.filtersByRoute;
          void _;
          syncUrlFingerprint(route, {});
          return { filtersByRoute: rest };
        });
      },

      getFilters: (route: string) => {
        return get().filtersByRoute[route] ?? {};
      },
    }),
    {
      name: "flexprice-filters",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

/** Convenience hook scoped to a single route. */
export function useFilterStore(route: string) {
  const store = useFilterStoreBase();
  return {
    filters: store.getFilters(route),
    setFilter: (key: string, value: FilterValue) => store.setFilter(route, key, value),
    resetFilters: () => store.resetFilters(route),
  };
}
