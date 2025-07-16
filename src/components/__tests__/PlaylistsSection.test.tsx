import "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import * as spotifyApi from "../../api/spotifyApi";
import type { ISpotifyPlaylistsResponse } from "../../types/spotify-playlists";
import { PlaylistsSection } from "../Playlists";
import type { ISpotifyCreatePlaylistResponse } from "../../types/spotify-create-playlist";

const mockPlaylists: ISpotifyPlaylistsResponse = {
  items: [
    {
      collaborative: false,
      description: "Playlist de teste",
      external_urls: { spotify: "https://spotify.com/playlist/1" },
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
        external_urls: { spotify: "https://spotify.com/user/dev" },
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
    },
  ],
  total: 1,
  limit: 10,
  offset: 0,
  href: "https://api.spotify.com/v1/me/playlists",
  next: null,
  previous: null,
};

describe("PlaylistsSection", () => {
  vi.spyOn(spotifyApi, "getUserPlaylists").mockResolvedValue(mockPlaylists);
  vi.spyOn(spotifyApi, "createPlaylist").mockResolvedValue(
    {} as unknown as ISpotifyCreatePlaylistResponse
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders playlists and opens modal", async () => {
    render(<PlaylistsSection />);

    expect(screen.getByText("Minhas Playlists")).toBeInTheDocument();
    expect(
      screen.getByText("Sua coleção pessoal de playlists")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Coding Vibes")).toBeInTheDocument();
    });

    expect(screen.getByText("Dev User")).toBeInTheDocument();

    const createButton = screen.getByRole("button", {
      name: /Criar playlist/i,
    });
    await userEvent.click(createButton);

    expect(screen.getByText(/Dê um nome a sua playlist/i)).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "Nova Playlist");

    const modalCreateButton = screen.getByRole("button", { name: /^Criar$/i });
    await userEvent.click(modalCreateButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Dê um nome a sua playlist/i)
      ).not.toBeInTheDocument();
    });

    expect(spotifyApi.createPlaylist).toHaveBeenCalledWith("Nova Playlist");
  });
});
