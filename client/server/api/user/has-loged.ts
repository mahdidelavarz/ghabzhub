export default defineEventHandler(event => {
    const token = getCookie(event, 'token')
    if (!token) return false
    else return true
})