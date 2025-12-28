export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event),
      config = useRuntimeConfig();
      
    setHeader(event, 'Cache-Control', 'no-cache, no-store')
    // request to /login api
    const data = await $fetch(`${config.apiBase}/auth/send-otp`, {
      method: "post",
      headers: {
        'x-secret-key': config.secret
      },
      body: {
        phone: body.phone
      }
    })

    return data
  } catch (err) {
    console.log(err);
  }
})