/// <reference types="vitest/globals" />

import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getUserInfo, logout } from "../spotifyApi";

// Mock global
vi.mock("axios");

const mockedAxios = axios as unknown as {
  create: ReturnType<typeof vi.fn>;
};

describe("api service", () => {
  let apiInstance: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    interceptors: { request: { use: ReturnType<typeof vi.fn> } };
    defaults: { headers: Record<string, unknown> };
  };

  beforeEach(() => {
    apiInstance = {
      get: vi.fn(),
      post: vi.fn(),
      interceptors: { request: { use: vi.fn() } },
      defaults: { headers: {} },
    };

    mockedAxios.create = vi.fn(() => apiInstance);

    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should call /v1/auth/me and return data", async () => {
    apiInstance.get.mockResolvedValueOnce({
      data: { id: "1", name: "Test User" },
    });

    const data = await getUserInfo();
    expect(data).toEqual({ id: "1", name: "Test User" });
    expect(apiInstance.get).toHaveBeenCalledWith("/v1/auth/me");
  });

  it("should call /v1/auth/logout and clear localStorage", async () => {
    localStorage.setItem("jwt", "token-value");
    apiInstance.post.mockResolvedValueOnce({});

    const openSpy = vi
      .spyOn(window, "open")
      .mockImplementation(() => null as unknown as WindowProxy);

    await logout();

    expect(localStorage.getItem("jwt")).toBeNull();
    expect(apiInstance.post).toHaveBeenCalledWith("/v1/auth/logout");
    expect(openSpy).toHaveBeenCalled();

    openSpy.mockRestore();
  });
});
