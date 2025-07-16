import "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "../Dashboard";
import * as spotifyApi from "../../services/spotifyApi";
import { BrowserRouter } from "react-router-dom";
import type { IUser } from "../../types/spotify-user";

const mockUser: IUser = {
  uuid: "user-123",
  spotifyId: "spotify-abc",
  displayName: "John Doe",
  email: "john@example.com",
  photos: ["https://via.placeholder.com/120"],
};

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

vi.mock("../../components/Sidebar", () => ({
  __esModule: true,
  default: () => <div>Sidebar Mock</div>,
}));

vi.mock("../../components/Artists", () => ({
  __esModule: true,
  default: () => <div>Artists Mock</div>,
}));

vi.mock("../../components/Playlists", () => ({
  __esModule: true,
  PlaylistsSection: () => <div>Playlists Mock</div>,
}));

vi.mock("../../components/Profile", () => ({
  __esModule: true,
  default: () => <div>Profile Mock</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Dashboard", () => {
  it("shows loading initially", () => {
    vi.spyOn(spotifyApi, "getUserInfo").mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renders user content when user is loaded", async () => {
    vi.spyOn(spotifyApi, "getUserInfo").mockResolvedValue(mockUser);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Bem-vindo, John Doe/i)).toBeInTheDocument();
    });

    expect(screen.getByText("Sidebar Mock")).toBeInTheDocument();
  });

  it("navigates to /login when user fetch fails", async () => {
    vi.spyOn(spotifyApi, "getUserInfo").mockRejectedValue(new Error("Erro"));

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
