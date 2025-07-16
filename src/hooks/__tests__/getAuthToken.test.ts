import "vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getAuthToken } from "../getAuthToken";

describe("getAuthToken", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns token when exists", () => {
    localStorage.setItem("jwt", "mock-token");
    const token = getAuthToken();
    expect(token).toBe("mock-token");
  });

  it("returns null when no token exists", () => {
    const token = getAuthToken();
    expect(token).toBeNull();
  });
});
