import "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Artists from "../Artists";
import * as spotifyApi from "../../api/spotifyApi";
import type { ISpotifyTopArtistsResponse } from "../../types/spotify-top-artists";
import { describe, it, expect, afterEach } from "vitest";

vi.mock("../ArtistAlbums", () => ({
  __esModule: true,
  default: () => <div>ArtistAlbums Mock</div>,
}));

describe("Artists", () => {
  const mockArtists: ISpotifyTopArtistsResponse = {
    items: [
      {
        id: "1",
        name: "Artist One",
        images: [
          {
            url: "https://via.placeholder.com/48",
            height: 48,
            width: 48,
          },
        ],
        genres: ["pop"],
        popularity: 80,
        followers: { href: null, total: 1000 },
        type: "artist",
        uri: "spotify:artist:1",
        href: "https://api.spotify.com/v1/artists/1",
        external_urls: { spotify: "https://spotify.com/artist/1" },
      },
      {
        id: "2",
        name: "Artist Two",
        images: [
          {
            url: "https://via.placeholder.com/48",
            height: 48,
            width: 48,
          },
        ],
        genres: ["rock"],
        popularity: 70,
        followers: { href: null, total: 500 },
        type: "artist",
        uri: "spotify:artist:2",
        href: "https://api.spotify.com/v1/artists/2",
        external_urls: { spotify: "https://spotify.com/artist/2" },
      },
    ],
    total: 2,
    limit: 15,
    offset: 0,
    href: "https://api.spotify.com/v1/me/top/artists",
    next: null,
    previous: null,
  };

  const mockGetTopArtists = vi
    .spyOn(spotifyApi, "getTopArtists")
    .mockResolvedValue(mockArtists);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders artist list and loads artists", async () => {
    render(<Artists />);

    // Checa título e subtítulo
    expect(screen.getByText("Top Artistas")).toBeInTheDocument();
    expect(
      screen.getByText("Aqui você encontra seus artistas preferidos")
    ).toBeInTheDocument();

    // Aguarda artistas carregarem
    await waitFor(() => {
      expect(screen.getByText("Artist One")).toBeInTheDocument();
      expect(screen.getByText("Artist Two")).toBeInTheDocument();
    });

    // Checa se API foi chamada
    expect(mockGetTopArtists).toHaveBeenCalledWith(0, 15);
  });

  it("opens ArtistAlbums when artist is clicked", async () => {
    render(<Artists />);

    await waitFor(() => {
      expect(screen.getByText("Artist One")).toBeInTheDocument();
    });

    const artist = screen.getByText("Artist One");
    await userEvent.click(artist);

    // Agora deve aparecer o mock do ArtistAlbums
    expect(screen.getByText("ArtistAlbums Mock")).toBeInTheDocument();
  });
});
