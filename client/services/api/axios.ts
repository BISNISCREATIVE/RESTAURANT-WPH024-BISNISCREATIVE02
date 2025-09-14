import Axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  "https://berestaurantappformentee-production.up.railway.app/api";

export const axios = Axios.create({
  baseURL: API_BASE,
});

axios.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
