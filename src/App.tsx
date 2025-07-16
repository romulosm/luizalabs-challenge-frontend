import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";
import Artists from "./components/Artists";
import { useOnlineStatus } from "./hooks/offlineService";

const App: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline && (
        <div
          style={{
            backgroundColor: "#ffcc00",
            color: "#000",
            padding: "8px",
            textAlign: "center",
          }}
        >
          ⚠️ Você está offline. Algumas funcionalidades podem não funcionar.
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/artist" element={<Artists />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
