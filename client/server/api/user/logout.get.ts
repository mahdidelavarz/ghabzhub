export default defineEventHandler((event) => {
    deleteCookie(event, 'token', {httpOnly: true})
    return true
})