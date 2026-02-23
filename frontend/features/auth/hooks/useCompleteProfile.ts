// features/auth/hooks/useCompleteProfile.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { completeProfileApi } from "../services/profile";
import { useAuthStore } from "../store/authStore";

type ApiError = {
    detail?: string | Array<{ msg?: string }>;
};

export function useCompleteProfile() {
    const qc = useQueryClient();
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: completeProfileApi,
        onSuccess: (data) => {
            if (data?.id && data?.mobile_number) {
                setUser(data);
            }
            qc.invalidateQueries({ queryKey: ["auth", "me"] });
            toast.success("پروفایل با موفقیت تکمیل شد");
            router.push("/");
        },
        onError: (error: AxiosError<ApiError>) => {
            const detail = error.response?.data?.detail;
            const message =
                typeof detail === "string"
                    ? detail
                    : Array.isArray(detail)
                    ? detail.map((e) => e.msg).filter(Boolean).join(", ")
                    : "ثبت پروفایل ناموفق بود";

            toast.error(message);
        },
    });
}
