// features/auth/hooks/useLogin.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import { loginApi, LoginPayload } from "../services/login";

export const useLogin = () => {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: (data: LoginPayload) => loginApi(data),

        onSuccess: (data, variables) => {
            localStorage.setItem("access_token", data.access_token);
            const user = data.user;

            setUser({
                id: user?.id ?? 0,
                name: user?.name ?? "",
                family_name: user?.family_name ?? "",
                mobile_number:
                    user?.mobile_number ?? user?.mobile ?? variables.mobile_number,
            });
            toast.success("ورود با موفقیت انجام شد");
            router.push("/");
        },

        onError: () => {
            toast.error("شماره یا رمز عبور اشتباه است");
        },
    });
};
