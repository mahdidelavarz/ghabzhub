// features/auth/hooks/useCompleteProfile.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { completeProfileApi } from "../services/profile";

export function useCompleteProfile() {
    const qc = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: completeProfileApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["auth", "me"] });
            router.push("/");
        },
    });
}