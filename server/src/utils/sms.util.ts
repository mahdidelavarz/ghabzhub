export const otpTemplate = (code: number | string): string => {
    return `
        قبض هاب\n
        رمز یک بار مصرف: ${code}
    `
}