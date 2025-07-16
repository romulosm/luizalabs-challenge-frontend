import { createContext } from "react";
import type { IUser } from "../types/spotify-user";

export interface AuthContextType {
  user: IUser | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });
