import "vitest";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useAuth } from "../useAuth";
import { AuthContext, type AuthContextType } from "../../contexts/AuthContext";
import type { IUser } from "../../types/spotify-user";

const mockUser: IUser = {
  uuid: "user-123",
  spotifyId: "spotify-abc",
  displayName: "John Doe",
  email: "john@example.com",
  photos: ["https://via.placeholder.com/120"],
};

describe("useAuth", () => {
  it("returns default context when no provider", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it("returns user from provider", () => {
    const contextValue: AuthContextType = { user: mockUser };

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
      ),
    });

    expect(result.current.user).toEqual(mockUser);
  });
});
