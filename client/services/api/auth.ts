import axios from "@/services/api/axios";

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token?: string; accessToken?: string; data?: { token?: string } } & Record<string, any>;

export async function loginApi(payload: LoginPayload) {
  const { data } = await axios.post<LoginResponse>(`/auth/login`, payload);
  return data;
}

export async function getProfileApi() {
  const { data } = await axios.get(`/auth/profile`);
  return data;
}
