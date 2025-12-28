export default defineEventHandler(async event => {
    try {
        const id = getQuery(event).id,
            config = useRuntimeConfig();

            console.log(id);
            
        const request = await $fetch(`/bill-cart/${id}` , {
            method: "delete",
            baseURL: config.apiBase,
            headers: {
                'x-secret-key': config.secret,
                "Authorization": `Bearer ${getCookie(event, 'token')}`
            }
        })

        return request
    } catch(err) {
        console.log(err);
    }
})