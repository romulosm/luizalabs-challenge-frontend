import "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import Profile from "../Profile";
import * as spotifyApi from "../../services/spotifyApi";
import { BrowserRouter } from "react-router-dom";
import type { IUser } from "../../types/spotify-user";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUser: IUser = {
  uuid: "user-123",
  spotifyId: "spotify-abc",
  displayName: "John Doe",
  email: "john@example.com",
  photos: ["https://via.placeholder.com/120"],
};

describe("Profile", () => {
  vi.spyOn(spotifyApi, "getUserInfo").mockResolvedValue(mockUser);
  vi.spyOn(spotifyApi, "logout").mockResolvedValue();

  afterEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("renders user info after loading", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /Sair/i })).toBeInTheDocument();
  });

  it("calls logout and navigates on click", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /Sair/i });
    await userEvent.click(button);

    expect(spotifyApi.logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
