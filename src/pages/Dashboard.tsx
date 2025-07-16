import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/spotifyApi";
import Sidebar from "../components/Sidebar";
import Artists from "../components/Artists";
import { useIsMobile } from "../hooks/useIsMobile";
import type { IUser } from "../types/spotify-user";
import { PlaylistsSection } from "../components/Playlists";
import Profile from "../components/Profile";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const data: IUser = await getUserInfo();
        if (isMounted) {
          setUser(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Erro ao buscar usuário:", error);
          navigate("/login");
        }
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (!user) {
    return <p style={{ color: "white" }}>Carregando...</p>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <h1>Bem-vindo, {user.displayName}</h1>;
      case "artists":
        return <Artists />;
      case "playlists":
        return <PlaylistsSection />;
      case "profile":
        return <Profile />;
      default:
        return <h1>Bem-vindo</h1>;
    }
  };

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", backgroundColor: "#000" }}
    >
      {isMobile && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1500,
            background: "transparent",
            border: "none",
            fontSize: "28px",
            color: "white",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        isMobile={isMobile}
      />

      <div
        style={{
          flex: 1,
          padding: "40px",
          color: "white",
          backgroundColor: "#090707",
          marginLeft: isMobile ? "0" : "240px",
          maxWidth: "100%",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
