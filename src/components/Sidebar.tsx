import React from "react";
import "./Sidebar.css";
import { InstallIcon } from "../assets/icons/installIcon";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { ArtistisIcon } from "../assets/icons/artistslcon";
import { PlaylistsIcon } from "../assets/icons/playListsIcon";
import { ProfileIcon } from "../assets/icons/profileIcon";
import { SpotifyIcon } from "../assets/icons/spotifyIcon";
import { HomeIcon } from "../assets/icons/homeIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
  isMobile: boolean;
};

const Sidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  setActiveTab,
  activeTab,
  isMobile,
}) => {
  const { canInstall, installApp } = usePWAInstall();

  const getIconColor = (tab: string) =>
    activeTab === tab ? "#FFFFFF" : "#949EA2";

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
        <div>
          {/* Botão fechar apenas no mobile */}
          {isMobile && isOpen && (
            <button
              onClick={onClose}
              style={{
                alignSelf: "flex-end",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                color: "white",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              ✕
            </button>
          )}

          <SpotifyIcon width="160px" height="50px" />

          <nav>
            <button onClick={() => handleClick("home")}>
              <HomeIcon
                width="24px"
                height="24px"
                color={getIconColor("home")}
              />
              <span style={{ color: getIconColor("home") }}>Home</span>
            </button>
            <button onClick={() => handleClick("artists")}>
              <ArtistisIcon
                width="24px"
                height="24px"
                color={getIconColor("artists")}
              />
              <span style={{ color: getIconColor("artists") }}>Artistas</span>
            </button>
            <button onClick={() => handleClick("playlists")}>
              <PlaylistsIcon
                width="24px"
                height="24px"
                color={getIconColor("playlists")}
              />
              <span style={{ color: getIconColor("playlists") }}>
                Playlists
              </span>
            </button>
            <button onClick={() => handleClick("profile")}>
              <ProfileIcon
                width="24px"
                height="24px"
                color={getIconColor("profile")}
              />
              <span style={{ color: getIconColor("profile") }}>Perfil</span>
            </button>
          </nav>
        </div>
        {canInstall && (
          <button onClick={installApp}>
            <InstallIcon width="24px" height="24px" color="white" />
            <span>Instalar PWA</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
