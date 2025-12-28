import { toast } from "vue3-toastify"
export const useAuth = defineStore('auth', () => {
    const state = reactive<{
        user: null | any,
        loading: boolean,
        validPin: number
    }>({
        user: null,
        loading: false,
        validPin: 2
    })

    const getOtpCode = async (phone: string) => {
        state.loading = true
        const { data, error } = await useFetch("/api/auth/get-otp", {
            method: "post",
            key: `request-${Date.now() * Math.random() * 1000}`,
            body: {
                phone: phone
            }
        }) as any

        if (data.value?.success === false) {
            toast.error(data.value.message)
            state.loading = false
            return;
        } else {
            // save token to cookie [otp-token]
            toast.success(data.value.message)
            useCookie('otp-token').value = data.value.data.token
            state.loading = false
            navigateTo('/login/verify')
        }
        state.loading = false
    }

    const verifyOtp = async (otp: string) => {
        state.loading = true
        const { data } = await useFetch('/api/auth/verify-otp', {
            method: "post",
            body: {
                otp
            }
        }) as any

        if (data.value.success === false) {
            toast.error(data.value.message)
            state.validPin = 0
            state.loading = false
        } else {
            state.validPin = 1
            location.href = '/'
            state.loading = false
        }
    }
    return {
        state,
        verifyOtp,
        getOtpCode
    }
})