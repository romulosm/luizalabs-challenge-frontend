import "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { AuthProvider } from "../AuthProvider";
import { AuthContext } from "../AuthContext";
import * as spotifyApi from "../../services/spotifyApi";
import type { IUser } from "../../types/spotify-user";

const mockUser: IUser = {
  uuid: "user-123",
  spotifyId: "spotify-abc",
  displayName: "John Doe",
  email: "john@example.com",
  photos: ["https://via.placeholder.com/120"],
};

const ConsumerComponent = () => {
  return (
    <AuthContext.Consumer>
      {(value) => (
        <div>
          <span>{value.user ? value.user.displayName : "Sem usuário"}</span>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

describe("AuthProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("provides user when getUserInfo resolves", async () => {
    vi.spyOn(spotifyApi, "getUserInfo").mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("sets user as null when getUserInfo fails", async () => {
    vi.spyOn(spotifyApi, "getUserInfo").mockRejectedValue(new Error("Erro"));

    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Sem usuário")).toBeInTheDocument();
    });
  });
});
