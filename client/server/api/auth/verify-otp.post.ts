export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event),
      config = useRuntimeConfig();
    // request to /login api
    const data = await $fetch(`${config.apiBase}/auth/verify-otp`, {
      method: "post",
      headers: {
        'x-secret-key': config.secret,
        'Authorization': `Bearer ${String(getCookie(event, 'otp-token'))}`
      },
      body: {
        otp: body.otp
      }
    })

    // @ts-ignore
    setCookie(event, 'token', data.data.access_token, {httpOnly: true, maxAge: (15 * 24 * 60 * 60) * 1000 })
    return data
  } catch (err) {
    console.log(err);
  }
})