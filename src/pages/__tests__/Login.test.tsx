import "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "../Login";
import * as spotifyApi from "../../services/spotifyApi";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual: typeof import("react-router-dom") = await vi.importActual(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("Login", () => {
  it("renders logo, text and button", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Entra com sua conta Spotify/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("navigates to dashboard when token is valid", async () => {
    localStorage.setItem("jwt", "valid-token");
    vi.spyOn(spotifyApi, "getUserInfo").mockResolvedValue({});

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(spotifyApi.getUserInfo).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("removes token when getUserInfo fails", async () => {
    localStorage.setItem("jwt", "invalid-token");
    vi.spyOn(spotifyApi, "getUserInfo").mockRejectedValue(
      new Error("Token inválido")
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(spotifyApi.getUserInfo).toHaveBeenCalled();
      expect(localStorage.getItem("jwt")).toBeNull();
      expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard");
    });
  });
});
