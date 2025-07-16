import axios from "axios";

export const createApi = () => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const getUserInfo = async () => {
  const api = createApi();
  const res = await api.get("/v1/auth/me");
  return res.data;
};

export const logout = async () => {
  const api = createApi();
  await api.post("/v1/auth/logout");
  localStorage.removeItem("jwt");
  window.open(
    `${import.meta.env.VITE_SPOTIFY_LOGOUT_URL}`,
    "_blank",
    "noopener,noreferrer"
  );
};
