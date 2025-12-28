export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(),
        body = await readBody(event)
        // request to /login api
        const data = await $fetch(`${config.apiBase}/user`, {
            method: "put",
            headers: {
                'x-secret-key': config.secret,
                "Authorization": `Bearer ${getCookie(event, 'token')}`
            },
            body: {
                name: body.name,
                family: body.family
            }
        })

        return data
    } catch (err) {
        console.log(err);
    }
})