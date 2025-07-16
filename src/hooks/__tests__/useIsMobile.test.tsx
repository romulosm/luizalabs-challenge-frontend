import "vitest";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useIsMobile } from "../useIsMobile";

describe("useIsMobile", () => {
  it("returns true when width is less than or equal to default breakpoint", () => {
    // Mock largura inicial
    window.innerWidth = 500;

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("returns false when width is greater than default breakpoint", () => {
    window.innerWidth = 1024;

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("updates value when resizing", () => {
    window.innerWidth = 1024;

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });

  it("uses custom breakpoint", () => {
    window.innerWidth = 900;

    const { result } = renderHook(() => useIsMobile(950));

    expect(result.current).toBe(true);
  });
});
