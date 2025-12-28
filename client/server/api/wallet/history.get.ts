export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    // request to /login api
    const data = await $fetch(`${config.apiBase}/wallet/history`, {
      headers: {
        'x-secret-key': config.secret,
        "Authorization": `Bearer ${getCookie(event, 'token')}`
      }
    })

    return data
  } catch (err) {
    console.log(err);
  }
})