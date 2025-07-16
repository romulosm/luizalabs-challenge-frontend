import React, { useEffect, useState, useRef, useCallback } from "react";
import { getArtistAlbums } from "../api/spotifyApi";
import type {
  ISpotifyAlbum,
  ISpotifyArtistAlbumsResponse,
} from "../types/spotify-artists-albums";
import { ArrowLeftIcon } from "../assets/icons/arrowLeftIcon";

interface ArtistAlbumsProps {
  artistId: string;
  artistName: string;
  artistImage: string;
  onBack: () => void;
}

const ArtistAlbums: React.FC<ArtistAlbumsProps> = ({
  artistId,
  artistName,
  artistImage,
  onBack,
}) => {
  const [albums, setAlbums] = useState<ISpotifyAlbum[]>([]);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const totalRef = useRef<number | null>(null);
  const loadingRef = useRef(false);
  const limit = 10;

  const fetchAlbums = useCallback(async () => {
    if (loadingRef.current) return;
    if (totalRef.current !== null && offsetRef.current >= totalRef.current)
      return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const data: ISpotifyArtistAlbumsResponse = await getArtistAlbums(
        artistId,
        offsetRef.current,
        limit
      );
      setAlbums((prev) => [...prev, ...data.items]);

      offsetRef.current += data.limit;
      totalRef.current = data.total;
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [artistId]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchAlbums();
        }
      },
      { rootMargin: "100px" }
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => observer.disconnect();
  }, [fetchAlbums]);

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              marginRight: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeftIcon />
          </button>

          <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
            {artistName}
          </h2>
        </div>

        <img
          src={artistImage}
          alt={artistName}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      {albums.map((album) => (
        <div
          key={album.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <img
            src={album.images[0]?.url}
            alt={album.name}
            style={{
              width: "64px",
              height: "64px",
              objectFit: "cover",
              marginRight: "12px",
            }}
          />
          <div>
            <div>{album.name}</div>
            <div style={{ color: "#b3b3b3", fontSize: "12px" }}>
              {album.release_date}
            </div>
          </div>
        </div>
      ))}

      <div ref={observerRef} style={{ height: "20px", marginTop: "20px" }} />

      {loading && <p style={{ color: "#b3b3b3" }}>Carregando mais álbuns...</p>}
    </div>
  );
};

export default ArtistAlbums;
