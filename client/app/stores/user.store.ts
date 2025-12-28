import { toast } from "vue3-toastify"

export const useUser = defineStore('user', () => {
    const state = reactive({
        user: null,
        loading: false
    })

    const getUser = async () => {
        const { data, error } = await useFetch("/api/user")
        if (error) {
            toast.error('خطایی در سرور پیش آمده')
        }
        return data.value
    }
    const userLogout = async () => {
        const { data, error } = await useFetch("/api/user/logout")
        if (error.value) {
            toast.error('مشکلی پیش آمده لطفا دوباره امتحان کنید')
            return;
        }
        if (data.value === true) {
            state.user = null
            await navigateTo("/")
            useRouter().go(0)
        }
    }

    const editUser = async (name: string, family: string) => {
        state.loading = true
        if (!name || !family) {
            toast.info("نام و فامیل خود را وارد کنید")
            state.loading = false
            return;
        }

        const { data, error } = await useFetch("/api/user", { method: 'put', body: {name, family} })
        
        if (error.value) {
            handleServerError()
            state.loading = false
            return;
        }

        // @ts-ignore
        if (data.value?.success) {
            // @ts-ignore
            toast.success(data.value.message)
        } else {
            // @ts-ignore
            toast.error(data.value.message)
        }

        state.loading = false
    }
    return {
        state,
        userLogout,
        getUser,
        editUser
    }
})