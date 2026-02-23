// features/auth/hooks/useProfileQuery.ts
"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../store/authStore";
import { getProfileApi } from "../services/profile";
import { useEffect } from "react";

export function useProfileQuery() {
    const setUser = useAuthStore((s) => s.setUser);
    const hasToken =
        typeof window !== "undefined" && !!localStorage.getItem("access_token");

    const query = useQuery({
        queryKey: ["auth", "me"],
        queryFn: getProfileApi,
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
