import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/spotifyApi";
import { SpotifyIcon } from "../assets/icons/spotifyIcon";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      try {
        await getUserInfo();
        navigate("/dashboard");
      } catch (error) {
        console.error("Token inválido, redirecionando para login", error);
        localStorage.removeItem("jwt");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#090707",
      }}
    >
      <SpotifyIcon width="165px" height="50px" />

      <p
        style={{
          color: "#FFFFFF",
          marginTop: "20px",
          marginBottom: "32px",
          maxWidth: "369px",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "0.01em",
          textAlign: "center",
        }}
      >
        Entra com sua conta Spotify clicando no botão abaixo
      </p>

      <button
        onClick={() => {
          window.location.href = `${
            import.meta.env.VITE_API_URL
          }/v1/auth/login?show_dialog=true`;
        }}
        style={{
          backgroundColor: "#57B660",
          color: "#FFFFFF",
          padding: "0 40px",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "24px",
          cursor: "pointer",
          fontFamily: "Rubik, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          gap: "10px",
          transition: "all 0.3s ease-in",
        }}
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
