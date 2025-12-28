import { toast } from "vue3-toastify"

export const useBillCart = defineStore('bill-cart', () => {
    const state = reactive({
        carts: null
    })

    const createBillCart = async (amount: string, details: Object) => {
        const createReq = await $fetch("/api/bill-cart", {
            method: "post",
            body: {
                amount,
                details
            }
        })
        // @ts-ignore
        if (createReq?.success === false) {
            // @ts-ignore
            return toast.error(createReq?.message)
        } else {
            navigateTo("/shopping")
        }
    }

    const getBillCarts = async () => {
        const { data, error } = await useFetch('/api/bill-cart', { method: "get" })
        if (error.value) return handleServerError();
        // set bill cart
        // @ts-ignore
        
        if (data.value.success === true) {
            // @ts-ignore
            state.carts = data.value?.data.cart
        }
    }

    const deleteBill = async (cartId: string) => {
        try {
            const data = await $fetch(`/api/bill-cart?id=${cartId}`, {
                method: "delete"
            })

            // @ts-ignore
            if (data.success) {
                // @ts-ignore
                toast.success(data.message)
            } else {
                // @ts-ignore
                toast.error(data.message)
            }
        } catch(err) {
            toast.error("مشکلی در حذف قبض پیش آمده")
        }
    }

    return {
        state,
        getBillCarts,
        createBillCart,deleteBill
    }
})