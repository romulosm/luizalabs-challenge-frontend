import React from "react";
import type { ISpotifyPlaylistResponse } from "../types/spotify-playlists";

const PlaylistCard: React.FC<{ playlist: ISpotifyPlaylistResponse }> = ({
  playlist,
}) => {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: 10, margin: 10, width: 200 }}
    >
      <h4>{playlist.name}</h4>
      <p>{playlist.description}</p>
    </div>
  );
};

export default PlaylistCard;
