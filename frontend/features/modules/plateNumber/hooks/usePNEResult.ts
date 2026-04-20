import { useQuery } from "@tanstack/react-query";


import { usePlateStore } from "../store/plateStore";
import { PNEResultService } from "../services/plateNumberServices";


export function usePNEResultQuery() {
  const orderId = usePlateStore((s) => s.orderId);


  const query = useQuery({
    queryKey: ["PNEResult", orderId],
    queryFn: () => PNEResultService(orderId),
    retry: false,
    staleTime: 60_000,
    enabled: !!orderId,
  });


  return query;
}
