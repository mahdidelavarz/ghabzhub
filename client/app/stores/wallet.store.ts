import { toast } from "vue3-toastify"

export const useWallet = defineStore('wallet', () => {
    const loading = ref(false),
        state = reactive({
            paymentLogs: null,
            wallet: null,
            balance: 0,
            walletHistory: null
        })

    const getPaymentLogs = async () => {
        const { data, error } = await useFetch("/api/payment/log")
        if (error.value) {
            return handleServerError()
        }
        // @ts-ignore
        state.paymentLogs = data.value?.data
        // @ts-ignore
        return data.value?.data
    }

    const startPayment = async (amount: number) => {
        loading.value = true
        if (!amount) {
            return toast.error('مقدار مبلغ را وارد کنید')
        }
        try {
            const data = await $fetch("/api/wallet/request-payment", {
                method: "post",
                body: {
                    amount
                }
            })
            // @ts-ignore
            if (!data.success) {
                // @ts-ignore
                return toast.error(data.message)
            } else {
                // @ts-ignore
                navigateTo(data?.data.payment.link, { external: true })
            }
        } catch (err) {
            console.log(err);
        } finally {
            loading.value = false
        }
    }

    const getBalance = async () => {
        loading.value = true
        const { data, error } = await useFetch("/api/wallet/get-balance", { key: `req-${Date.now() * Math.random() * 1000}` })
        if (error.value) {
            loading.value = false
            return handleServerError()
        }

        // @ts-ignore
        state.wallet = data.value?.data?.wallet
        loading.value = false
        // @ts-ignore
        return data.value?.data.wallet
    }

    const getWalletHistory = async () => {
        const { data, error } = await useFetch("/api/wallet/history")
        if (error.value) {
            return handleServerError()
        }

        // @ts-ignore
        state.walletHistory = data.value.data.history
        // @ts-ignore
        return data.value.data.history
    }

    const pay = async () => {
        try {
            const payReq = await $fetch("/api/wallet/pay-wallet" ,{method: "post"})
            // @ts-ignore
            if (payReq?.success) {
                // @ts-ignore
                toast.success(payReq.message ,{autoClose: 1_600})
                setTimeout(() => {
                    useRouter().go(0)
                } , 1_670)
            } else {
                console.log(payReq);
                
                // @ts-ignore
                toast.success(payReq?.message)
                return;
            }
        } catch(err) {
            console.log(err);
            
            toast.error("پرداخت انجام نشد دوباره امتحان کنید")
        }
    }

    return {
        getPaymentLogs,
        state,
        loading,
        getBalance,
        startPayment,
        getWalletHistory,
        pay
    }
})