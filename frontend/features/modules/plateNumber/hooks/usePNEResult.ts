// hooks/usePNEResult.ts
import { useQuery } from "@tanstack/react-query";
import { PNEResultService } from "../services/plateNumberServices";

export function usePNEResultQuery(orderId: string | null) {
  return useQuery({
    queryKey: ["PNEResult", orderId],
    queryFn: () => PNEResultService(orderId!),
    retry: false,
    staleTime: 60_000,
    enabled: !!orderId,
  });
}