import React, { useState, useEffect } from "react";
import { getUserInfo } from "../services/spotifyApi";
import { AuthContext } from "./AuthContext";
import type { IUser } from "../types/spotify-user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserInfo()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
