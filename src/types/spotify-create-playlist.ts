export interface ISpotifyCreatePlaylistOwner {
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string | null;
  external_urls: {
    spotify: string;
  };
}

export interface ISpotifyCreatePlaylistTracks {
  href: string;
  items: unknown[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface ISpotifyCreatePlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: unknown[];
  primary_color: string | null;
  name: string;
  type: string;
  uri: string;
  owner: ISpotifyCreatePlaylistOwner;
  public: boolean;
  snapshot_id: string;
  tracks: ISpotifyCreatePlaylistTracks;
}
