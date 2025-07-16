import "vitest";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useOnlineStatus } from "../offlineService";

describe("useOnlineStatus", () => {
  it("returns initial online status", () => {
    // Mock online
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  it("updates status when going offline and online", () => {
    // Default online
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });

    const { result } = renderHook(() => useOnlineStatus());

    // Simula offline
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });

    expect(result.current).toBe(false);

    // Simula online
    act(() => {
      window.dispatchEvent(new Event("online"));
    });

    expect(result.current).toBe(true);
  });
});
