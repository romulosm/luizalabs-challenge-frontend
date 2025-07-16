import "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ArtistAlbums from "../ArtistAlbums";
import * as spotifyApi from "../../api/spotifyApi";
import type { ISpotifyArtistAlbumsResponse } from "../../types/spotify-artists-albums";
import { describe, it, expect, afterEach } from "vitest";

describe("ArtistAlbums", () => {
  const mockAlbums: ISpotifyArtistAlbumsResponse = {
    items: [
      {
        id: "1",
        name: "Album One",
        release_date: "2020-01-01",
        release_date_precision: "day",
        images: [
          {
            url: "https://via.placeholder.com/64",
            height: 64,
            width: 64,
          },
        ],
        album_type: "album",
        total_tracks: 10,
        available_markets: ["US", "BR"],
        external_urls: { spotify: "https://spotify.com/album/1" },
        artists: [],
        href: "",
        uri: "",
        type: "album",
      },
      {
        id: "2",
        name: "Album Two",
        release_date: "2021-01-01",
        release_date_precision: "day",
        images: [
          {
            url: "https://via.placeholder.com/64",
            height: 64,
            width: 64,
          },
        ],
        album_type: "album",
        total_tracks: 8,
        available_markets: ["US", "BR"],
        external_urls: { spotify: "https://spotify.com/album/2" },
        artists: [],
        href: "",
        uri: "",
        type: "album",
      },
    ],
    total: 2,
    limit: 10,
    href: "",
    next: null,
    offset: 0,
    previous: null,
  };

  const mockGetArtistAlbums = vi
    .spyOn(spotifyApi, "getArtistAlbums")
    .mockResolvedValue(mockAlbums);

  const defaultProps = {
    artistId: "123",
    artistName: "Artist Test",
    artistImage: "https://via.placeholder.com/64",
    onBack: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders artist info and albums", async () => {
    render(<ArtistAlbums {...defaultProps} />);

    // Artista
    expect(screen.getByText("Artist Test")).toBeInTheDocument();
    expect(screen.getByAltText("Artist Test")).toBeInTheDocument();

    // Espera carregar álbuns
    await waitFor(() => {
      expect(screen.getByText("Album One")).toBeInTheDocument();
      expect(screen.getByText("Album Two")).toBeInTheDocument();
    });

    // Checa se chamou API
    expect(mockGetArtistAlbums).toHaveBeenCalledWith("123", 0, 10);
  });

  it("calls onBack when back button is clicked", async () => {
    render(<ArtistAlbums {...defaultProps} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });
});
