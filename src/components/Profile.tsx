import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, logout } from "../services/spotifyApi";
import type { IUser } from "../types/spotify-user";

const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    try {
      await getUserInfo();
      navigate("/");
    } catch (err) {
      console.error("Erro ao verificar token", err);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Usuário não encontrado
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={user.photos[0] || "https://via.placeholder.com/120"}
        alt={user.displayName}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "1rem",
        }}
      />
      <h2 style={{ marginBottom: "1.5rem" }}>{user.displayName}</h2>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#1DB954",
          color: "#000",
          border: "none",
          borderRadius: "24px",
          padding: "0 40px",
          height: "42px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Sair
      </button>
    </div>
  );
};

export default Profile;
