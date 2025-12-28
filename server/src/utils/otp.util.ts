export const generateOTP = (digits: number):number => {
    const numbers = '0123456789'
    let otp = ''
    for (let i = 0; i < digits; i++) {
        // @ts-ignore
        otp += numbers.at(Math.floor(Math.random() * (numbers.length - 1)))
    }
    return +otp
}