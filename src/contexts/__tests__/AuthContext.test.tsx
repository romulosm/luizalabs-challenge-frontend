import "vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import type { IUser } from "../../types/spotify-user";
import { AuthContext, type AuthContextType } from "../AuthContext";

const mockUser: IUser = {
  uuid: "user-123",
  spotifyId: "spotify-abc",
  displayName: "John Doe",
  email: "john@example.com",
  photos: ["https://via.placeholder.com/120"],
};

// Componente consumidor para teste
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

describe("AuthContext", () => {
  it("provides default value (user: null)", () => {
    render(<ConsumerComponent />);

    expect(screen.getByText("Sem usuário")).toBeInTheDocument();
  });

  it("provides value from Provider", () => {
    const contextValue: AuthContextType = { user: mockUser };

    render(
      <AuthContext.Provider value={contextValue}>
        <ConsumerComponent />
      </AuthContext.Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
