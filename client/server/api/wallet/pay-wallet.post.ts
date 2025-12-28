export default defineEventHandler(async event => {
    const body = await readBody(event),
        config = useRuntimeConfig();

    try {
        const requestPay = await $fetch(`${config.apiBase}/wallet/pay`, {
            method: "post",
            headers: {
                'Content-Type': "application/json",
                'x-secret-key': config.secret,
                "Authorization": `Bearer ${getCookie(event, 'token')}`
            }
        })
        return requestPay
    } catch (err) {
        console.log(err);

    }
})