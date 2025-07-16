import "vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserInfo from "../UserInfo";
import type { IUser } from "../../types/spotify-user";

const mockUser: IUser = {
  uuid: "user-123",
  spotifyId: "spotify-abc",
  displayName: "John Doe",
  email: "john@example.com",
  photos: ["https://via.placeholder.com/50"],
};

describe("UserInfo", () => {
  it("renders user info correctly", () => {
    render(<UserInfo user={mockUser} />);

    expect(screen.getByRole("img", { name: /user/i })).toHaveAttribute(
      "src",
      mockUser.photos[0]
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
