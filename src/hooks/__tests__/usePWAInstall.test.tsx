import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { usePWAInstall } from "../usePWAInstall";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

describe("usePWAInstall", () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    vi.useFakeTimers();
    console.log = vi.fn(); // mocka logs
  });

  afterEach(() => {
    vi.useRealTimers();
    console.log = originalConsoleLog;
    vi.clearAllMocks();
  });

  it("should mark isCompatible as false if beforeinstallprompt is not triggered", () => {
    const { result } = renderHook(() => usePWAInstall());

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.isCompatible).toBe(false);
  });

  it("should call prompt and log user choice when installApp is called", async () => {
    const mockPrompt = vi.fn().mockResolvedValue(undefined);
    const mockUserChoice = Promise.resolve({
      outcome: "accepted",
      platform: "web",
    });

    const mockEvent = new Event(
      "beforeinstallprompt"
    ) as BeforeInstallPromptEvent;

    Object.defineProperty(mockEvent, "prompt", {
      value: mockPrompt,
    });

    Object.defineProperty(mockEvent, "userChoice", {
      value: mockUserChoice,
    });

    const { result } = renderHook(() => usePWAInstall());

    act(() => {
      window.dispatchEvent(mockEvent);
    });

    await act(async () => {
      await result.current.installApp();
    });

    expect(mockPrompt).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("User choice:", "accepted");
  });
});
