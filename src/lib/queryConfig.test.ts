import { describe, it, expect } from "vitest";
import { createQueryConfig, QUERY_PRESETS } from "./queryConfig";

describe("createQueryConfig", () => {
  it("returns global defaults when called with no arguments", () => {
    const config = createQueryConfig();
    expect(config.staleTime).toBe(5 * 60_000);
    expect(config.gcTime).toBe(10 * 60_000);
  });

  it("returns REALTIME preset values", () => {
    const config = createQueryConfig("REALTIME");
    expect(config.staleTime).toBe(0);
    expect(config.gcTime).toBe(60_000);
  });

  it("returns DEFAULT preset values", () => {
    const config = createQueryConfig("DEFAULT");
    expect(config.staleTime).toBe(5 * 60_000);
    expect(config.gcTime).toBe(10 * 60_000);
  });

  it("returns STATIC preset values", () => {
    const config = createQueryConfig("STATIC");
    expect(config.staleTime).toBe(30 * 60_000);
    expect(config.gcTime).toBe(60 * 60_000);
  });

  it("allows partial overrides on top of defaults", () => {
    const config = createQueryConfig({ staleTime: 0 });
    expect(config.staleTime).toBe(0);
    expect(config.gcTime).toBe(10 * 60_000); // default gcTime preserved
  });

  it("allows full overrides", () => {
    const config = createQueryConfig({ staleTime: 1000, gcTime: 2000 });
    expect(config.staleTime).toBe(1000);
    expect(config.gcTime).toBe(2000);
  });

  it("throws for unknown preset name", () => {
    // @ts-expect-error intentional invalid preset
    expect(() => createQueryConfig("INVALID")).toThrow("Unknown query preset");
  });

  it("returns a new object on each call (no mutation)", () => {
    const a = createQueryConfig("DEFAULT");
    const b = createQueryConfig("DEFAULT");
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});

describe("QUERY_PRESETS", () => {
  it("has all expected presets defined", () => {
    expect(QUERY_PRESETS).toHaveProperty("REALTIME");
    expect(QUERY_PRESETS).toHaveProperty("DEFAULT");
    expect(QUERY_PRESETS).toHaveProperty("STATIC");
  });

  it("REALTIME has the shortest staleTime", () => {
    expect(QUERY_PRESETS.REALTIME.staleTime).toBeLessThan(QUERY_PRESETS.DEFAULT.staleTime);
  });

  it("STATIC has the longest staleTime", () => {
    expect(QUERY_PRESETS.STATIC.staleTime).toBeGreaterThan(QUERY_PRESETS.DEFAULT.staleTime);
  });
});
