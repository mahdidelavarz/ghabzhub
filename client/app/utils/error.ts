import { toast } from "vue3-toastify"

export const handleServerError = (): void => {
    toast.error('مشکلی در سرور رخ داده است لطفا دوباره امتحان کنید')
}

export const handleHubApiErrors = (statusCode: number) => {
    const errorMessages = {
        400: 'خطایی در استعلام رخ داده',
        401: 'برای استعلام اطلاعات لازم را وارد کنید',
        408: 'خطایی رخ داده لطفا دوباره امتحان کنید',
        424: 'خطایی در استعلام رخ داده',
        422: 'اطلاعات را به درستی وارد کنید'
    }
    
    for (let code in errorMessages) {
        if (statusCode === +code) {
            // @ts-ignore
            return toast.error(errorMessages[code])
        }
    }
}