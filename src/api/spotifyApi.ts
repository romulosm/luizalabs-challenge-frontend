import type { ISpotifyArtistAlbumsResponse } from "../types/spotify-artists-albums";
import type { ISpotifyCreatePlaylistResponse } from "../types/spotify-create-playlist";
import type { ISpotifyPlaylistsResponse } from "../types/spotify-playlists";
import type { ISpotifyTopArtistsResponse } from "../types/spotify-top-artists";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export async function getTopArtists(
  offset = 0,
  limit = 10
): Promise<ISpotifyTopArtistsResponse> {
  const token = localStorage.getItem("jwt");

  const res = await fetch(
    `${API_URL}/v1/spotify/top-artists?offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar artistas");
  }

  return await res.json();
}

export async function getArtistAlbums(
  id: string,
  offset = 0,
  limit = 10
): Promise<ISpotifyArtistAlbumsResponse> {
  const token = localStorage.getItem("jwt");

  const res = await fetch(
    `${API_URL}/v1/spotify/artist/${id}/albums?offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar álbuns");
  }

  return await res.json();
}

export async function getUserPlaylists(
  offset = 0,
  limit = 10
): Promise<ISpotifyPlaylistsResponse> {
  const token = localStorage.getItem("jwt");

  const res = await fetch(
    `${API_URL}/v1/spotify/playlists?offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar playlists");
  }

  return await res.json();
}

export async function createPlaylist(
  name: string,
  description?: string
): Promise<ISpotifyCreatePlaylistResponse> {
  const token = localStorage.getItem("jwt");

  const res = await fetch(`${API_URL}/v1/spotify/playlists`, {
    method: "POST",
    body: JSON.stringify({ name, description }),
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao criar playlist");
  }

  return await res.json();
}
