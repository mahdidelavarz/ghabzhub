export default defineEventHandler(async event => {
    try {
        const body = await readBody(event),
            config = useRuntimeConfig();

        const request = await $fetch('/bill-cart' , {
            method: "post",
            baseURL: config.apiBase,
            headers: {
                'x-secret-key': config.secret,
                "Authorization": `Bearer ${getCookie(event, 'token')}`
            },
            body: {
                amount: body.amount || "",
                details: body.details || {}
            }
        })

        return request
    } catch(err) {
        console.log(err);
    }
})