import Axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";

export const axios = Axios.create({ baseURL });

export default axios;
