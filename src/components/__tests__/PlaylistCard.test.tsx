import "vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PlaylistCard from "../PlaylistCard";
import type { ISpotifyPlaylistResponse } from "../../types/spotify-playlists";

const mockPlaylist: ISpotifyPlaylistResponse = {
  collaborative: false,
  description: "Uma playlist incrível para codar!",
  external_urls: {
    spotify: "https://spotify.com/playlist/1",
  },
  href: "https://api.spotify.com/v1/playlists/1",
  id: "1",
  images: [
    {
      height: 300,
      url: "https://via.placeholder.com/300",
      width: 300,
    },
  ],
  name: "Coding Vibes",
  owner: {
    display_name: "Dev User",
    external_urls: {
      spotify: "https://spotify.com/user/dev",
    },
    href: "https://api.spotify.com/v1/users/dev",
    id: "dev",
    type: "user",
    uri: "spotify:user:dev",
  },
  primary_color: null,
  public: true,
  snapshot_id: "snapshot123",
  tracks: {
    href: "https://api.spotify.com/v1/playlists/1/tracks",
    total: 42,
  },
  type: "playlist",
  uri: "spotify:playlist:1",
};

describe("PlaylistCard", () => {
  it("renders playlist name and description", () => {
    render(<PlaylistCard playlist={mockPlaylist} />);

    expect(screen.getByText("Coding Vibes")).toBeInTheDocument();
    expect(
      screen.getByText("Uma playlist incrível para codar!")
    ).toBeInTheDocument();
  });
});
