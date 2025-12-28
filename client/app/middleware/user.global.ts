import { useUser } from "~/stores/user.store"
export default defineNuxtRouteMiddleware(async (to, from) => {
    const {data: token} = await useFetch("/api/user/has-loged")
    let { state } = useUser()
    if (token.value) {

        const { data } = await useFetch("/api/user")
        // @ts-ignore
        state.user = data.value?.data?.user
        
        if (!state.user) {
            await useFetch('/api/user/logout')
            state.user = null
        }
        if (!token.value) {
            state.user = null
        }
    }

})