import Axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";

export const axios = Axios.create({ baseURL });

// attach token if present
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  return config;
});

export default axios;
