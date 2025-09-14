import axios from "./axios";

export async function createRestaurant(payload: any) {
  const { data } = await axios.post(`/resto`, payload);
  return data;
}

export async function updateRestaurant(id: string | number, payload: any) {
  const { data } = await axios.put(`/resto/${id}`, payload);
  return data;
}

export async function deleteRestaurant(id: string | number) {
  const { data } = await axios.delete(`/resto/${id}`);
  return data;
}
