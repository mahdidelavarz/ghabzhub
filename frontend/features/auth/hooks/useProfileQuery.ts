import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../store/authStore";

import { useEffect } from "react";
import { getProfileService } from "../services/authServices";

export function useProfileQuery() {
    const setUser = useAuthStore((s) => s.setUser);
    const hasToken =
        typeof window !== "undefined" && !!localStorage.getItem("access_token");

    const query = useQuery({
        queryKey: ["auth", "me"],
        queryFn: getProfileService,
        retry: false,
        staleTime: 60_000,
        enabled: hasToken,
    });

    useEffect(() => {
        if (query.data) {
            setUser(query.data);
        }
    }, [query.data, setUser]);

    return query;
}
