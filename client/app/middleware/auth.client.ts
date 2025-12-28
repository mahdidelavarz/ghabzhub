import { toast } from "vue3-toastify"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {state: {user}} = useUser()
    if (!user) {
        return navigateTo('/login')
    }
})