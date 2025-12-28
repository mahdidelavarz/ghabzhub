export default defineEventHandler(async event => {
    try {
        const config = useRuntimeConfig()
        const billCartList = await $fetch(`${config.apiBase}/bill-cart`, {
            headers: {
                'x-secret-key': config.secret,
                "Authorization": `Bearer ${getCookie(event, 'token')}`
            }
        })

        return billCartList
    } catch (err) {
        console.log(err);

    }
})