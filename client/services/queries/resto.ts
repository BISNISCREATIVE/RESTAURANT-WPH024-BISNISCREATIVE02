import { useQuery } from "@tanstack/react-query";
import axios from "@/services/api/axios";
import type { RestaurantDetail, RestaurantSummary } from "@/types";

export function useRestaurantsQuery(params?: { q?: string }) {
  return useQuery({
    queryKey: ["restaurants", params],
    queryFn: async () => {
      const { data } = await axios.get<RestaurantSummary[]>("/api/resto", {
        params: { q: params?.q },
      });
      return data;
    },
    staleTime: 60_000,
  });
}

export function useRestaurantDetailQuery(id?: string | number) {
  return useQuery({
    enabled: !!id,
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const { data } = await axios.get<{ data: RestaurantDetail }>(
        `/api/resto/${id}`
      );
      // Some endpoints return {data:{...}}; normalize to RestaurantDetail
      return (data as any).data ?? (data as any);
    },
    staleTime: 60_000,
  });
}
