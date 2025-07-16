import "vitest";
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
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    vi.clearAllMocks();
  });

  it("initially has canInstall false", () => {
    const { result } = renderHook(() => usePWAInstall());
    expect(result.current.canInstall).toBe(false);
  });

  it("calls prompt and updates state after install", async () => {
    const mockPrompt = vi.fn().mockResolvedValue(undefined);
    const mockUserChoice = Promise.resolve({
      outcome: "accepted",
      platform: "web",
    });

    // Cria evento customizado
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

    // Dispara evento
    act(() => {
      window.dispatchEvent(mockEvent);
    });

    await act(async () => {
      await result.current.installApp();
    });

    expect(mockPrompt).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("User choice:", "accepted");
    expect(result.current.canInstall).toBe(false);
  });
});
