import "vitest";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AuthSuccess from "../AuthSuccess";
import { MemoryRouter } from "react-router-dom";
import type { Location } from "react-router-dom";

const mockNavigate = vi.fn();
let mockLocation: Partial<Location> = { search: "?token=test-token" };

vi.mock("react-router-dom", async () => {
  const actual: typeof import("react-router-dom") = await vi.importActual(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe("AuthSuccess", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    mockLocation = { search: "?token=test-token" };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("saves token and navigates to /dashboard when token exists", () => {
    render(
      <MemoryRouter>
        <AuthSuccess />
      </MemoryRouter>
    );

    expect(localStorage.getItem("jwt")).toBe("test-token");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("navigates to /login when no token", () => {
    mockLocation = { search: "" };

    render(
      <MemoryRouter>
        <AuthSuccess />
      </MemoryRouter>
    );

    expect(localStorage.getItem("jwt")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows loading text", () => {
    render(
      <MemoryRouter>
        <AuthSuccess />
      </MemoryRouter>
    );

    expect(document.body.textContent).toContain("Autenticando...");
  });
});
