import React, { useEffect, useState, useRef, useCallback } from "react";
import { getUserPlaylists, createPlaylist } from "../api/spotifyApi";
import type {
  ISpotifyPlaylistResponse,
  ISpotifyPlaylistsResponse,
} from "../types/spotify-playlists";

export const PlaylistsSection: React.FC = () => {
  const [playlists, setPlaylists] = useState<ISpotifyPlaylistResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("Minha playlist #1");
  const [creating, setCreating] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  const offsetRef = useRef(0);
  const loadingRef = useRef(false);
  const totalRef = useRef<number | null>(null);

  const fetchPlaylists = useCallback(async (reset = false) => {
    if (loadingRef.current) return;
    if (
      !reset &&
      totalRef.current !== null &&
      offsetRef.current >= totalRef.current
    )
      return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const data: ISpotifyPlaylistsResponse = await getUserPlaylists(
        offsetRef.current,
        limit
      );

      if (reset) {
        setPlaylists(data.items);
        offsetRef.current = data.limit;
      } else {
        setPlaylists((prev) => [...prev, ...data.items]);
        offsetRef.current += data.limit;
      }
      totalRef.current = data.total;
    } catch (error) {
      console.error("Erro ao buscar playlists:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists(true);
  }, [fetchPlaylists]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPlaylists();
        }
      },
      { rootMargin: "100px" }
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => observer.disconnect();
  }, [fetchPlaylists]);

  const handleCreatePlaylist = async () => {
    try {
      setCreating(true);
      await createPlaylist(playlistName);
      setIsModalOpen(false);
      setPlaylistName("Minha playlist #1");
      offsetRef.current = 0;
      totalRef.current = null;
      await fetchPlaylists(true);
    } catch (error) {
      console.error("Erro ao criar playlist", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#fff", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Minhas Playlists</h2>
          <p>Sua coleção pessoal de playlists</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#1DB954",
            color: "#000",
            border: "none",
            borderRadius: "24px",
            padding: "0 40px",
            height: "42px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Criar playlist
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              cursor: "pointer",
            }}
          >
            <img
              src={
                playlist.images && playlist.images.length > 0
                  ? playlist.images[0].url
                  : "https://via.placeholder.com/60"
              }
              alt={playlist.name}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                marginRight: "1rem",
              }}
            />
            <div>
              <div>{playlist.name}</div>
              <div style={{ color: "#b3b3b3", fontSize: "0.9rem" }}>
                {playlist.owner?.display_name || "Sem Etiqueta"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={observerRef} style={{ height: "20px", marginTop: "20px" }} />

      {loading && (
        <p style={{ color: "#b3b3b3" }}>Carregando mais playlists...</p>
      )}

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#00000066",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#121212",
              padding: "2rem",
              borderRadius: "12px",
              minWidth: "300px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <p style={{ marginBottom: "1rem" }}>Dê um nome a sua playlist</p>
            <input
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                border: "none",
                borderBottom: "1px solid #fff",
                background: "transparent",
                color: "#fff",
                fontSize: "1rem",
                textAlign: "center",
              }}
            />
            <button
              onClick={handleCreatePlaylist}
              disabled={creating}
              style={{
                backgroundColor: "#57B660",
                color: "#000",
                border: "none",
                borderRadius: "20px",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {creating ? "Criando..." : "Criar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
