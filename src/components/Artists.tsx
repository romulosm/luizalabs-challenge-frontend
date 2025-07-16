import React, { useEffect, useState, useRef, useCallback } from "react";
import { getTopArtists } from "../api/spotifyApi";
import ArtistAlbums from "./ArtistAlbums";
import type {
  ISpotifyArtist,
  ISpotifyTopArtistsResponse,
} from "../types/spotify-top-artists";

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<ISpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedArtist, setSelectedArtist] = useState<{
    id: string;
    name: string;
    image: string;
  } | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 15;

  const offsetRef = useRef(0);
  const loadingRef = useRef(false);
  const totalRef = useRef<number | null>(null);

  const fetchArtists = useCallback(async () => {
    if (loadingRef.current) return;
    if (totalRef.current !== null && offsetRef.current >= totalRef.current)
      return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const data: ISpotifyTopArtistsResponse = await getTopArtists(
        offsetRef.current,
        limit
      );

      setArtists((prev) => [...prev, ...data.items]);

      offsetRef.current += data.limit;
      totalRef.current = data.total;
    } catch (error) {
      console.error("Erro ao buscar artistas:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchArtists();
        }
      },
      { rootMargin: "100px" }
    );

    const current = observerRef.current;
    observer.observe(current);

    return () => observer.disconnect();
  }, [fetchArtists]);

  if (selectedArtist) {
    return (
      <ArtistAlbums
        artistId={selectedArtist.id}
        artistName={selectedArtist.name}
        artistImage={selectedArtist.image}
        onBack={() => setSelectedArtist(null)}
      />
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "8px" }}>Top Artistas</h2>
      <p style={{ marginBottom: "24px", color: "#b3b3b3" }}>
        Aqui você encontra seus artistas preferidos
      </p>

      {artists.map((artist) => (
        <div
          key={artist.id}
          onClick={() =>
            setSelectedArtist({
              id: artist.id,
              name: artist.name,
              image: artist.images[0]?.url,
            })
          }
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            cursor: "pointer",
          }}
        >
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "12px",
            }}
          />
          <span>{artist.name}</span>
        </div>
      ))}

      <div ref={observerRef} style={{ height: "20px", marginTop: "20px" }} />

      {loading && (
        <p style={{ color: "#b3b3b3" }}>Carregando mais artistas...</p>
      )}
    </div>
  );
};

export default Artists;
