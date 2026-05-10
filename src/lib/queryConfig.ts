/**
 * Configurable TanStack Query caching utility.
 *
 * Provides global defaults and named presets so every query call-site
 * has consistent, intentional cache behaviour.
 */

export interface QueryCacheConfig {
  staleTime: number;
  gcTime: number;
}

/** Pre-defined caching presets. */
export const QUERY_PRESETS = {
  /** For data that must always be fresh (e.g. real-time usage counters). */
  REALTIME: { staleTime: 0, gcTime: 60_000 } as const,
  /** Sensible default — data considered fresh for 5 minutes. */
  DEFAULT: { staleTime: 5 * 60_000, gcTime: 10 * 60_000 } as const,
  /** For rarely-changing data (e.g. plan definitions, feature flags). */
  STATIC: { staleTime: 30 * 60_000, gcTime: 60 * 60_000 } as const,
} satisfies Record<string, QueryCacheConfig>;

export type QueryPresetName = keyof typeof QUERY_PRESETS;

const GLOBAL_DEFAULTS: QueryCacheConfig = QUERY_PRESETS.DEFAULT;

/**
 * Creates a query config object by merging global defaults with optional overrides.
 *
 * @param presetOrOverrides - Either a preset name ("REALTIME", "DEFAULT", "STATIC")
 *   or an object with explicit staleTime / gcTime values.
 * @returns A complete QueryCacheConfig ready to spread into useQuery options.
 *
 * @example
 * // Use the STATIC preset
 * useQuery({ ...createQueryConfig("STATIC"), queryKey: ["plans"], queryFn: fetchPlans })
 *
 * @example
 * // Override just staleTime
 * useQuery({ ...createQueryConfig({ staleTime: 0 }), queryKey: ["live"], queryFn: fetchLive })
 */
export function createQueryConfig(
  presetOrOverrides?: QueryPresetName | Partial<QueryCacheConfig>
): QueryCacheConfig {
  if (presetOrOverrides === undefined) {
    return { ...GLOBAL_DEFAULTS };
  }

  if (typeof presetOrOverrides === "string") {
    const preset = QUERY_PRESETS[presetOrOverrides];
    if (!preset) {
      throw new Error(`Unknown query preset: ${presetOrOverrides}`);
    }
    return { ...preset };
  }

  return {
    ...GLOBAL_DEFAULTS,
    ...presetOrOverrides,
  };
}
