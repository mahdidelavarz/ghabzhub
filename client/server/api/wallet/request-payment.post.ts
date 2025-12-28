export default defineEventHandler(async event => {
    const body = await readBody(event),
        config = useRuntimeConfig();

    try {
        const requestPayment = await $fetch(`${config.apiBase}/wallet/deposit/request`, {
            method: "post",
            headers: {
                'Content-Type': "application/json",
                'x-secret-key': config.secret,
                "Authorization": `Bearer ${getCookie(event, 'token')}`
            },
            body: {
                amount: body.amount
            }
        })
        return requestPayment
    } catch (err) {
        console.log(err);

    }
})