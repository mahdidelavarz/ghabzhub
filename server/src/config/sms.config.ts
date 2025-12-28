import axios from "axios"
import { createError } from "../utils/response.util"

export const sendSms = async (message: string, destinationAddress: string[]) => {
    try {
        let changedNumber = destinationAddress.map((number) => {
            if (number.startsWith("0")) {
                return "98" + number.substring(1)
            }
        })

        const { data } = await axios.post(
            `${process.env.INQUIRY_URL}/sendsms/${process.env.SMS_SOURCE_ADDRESS}`,
            {
                SourceAddress: process.env.SMS_SOURCE_ADDRESS,
                MessageText: message || " ",
                DestinationAddress: changedNumber || []
            },
            {
                headers: {
                    'token': process.env.INQUIRY_TOKEN || '',
                    "Content-Type": "application/json"
                }
            }
        )

        if (data?.isSuccess) {
            return true
        } else {
            createError(400, 'کد تایید ارسال نشد', {
                statusText: "bad-request"
            })
        }
    } catch (err) {
        createError(400, "خطایی در ارسال پیامک رخ داده است", {})
    }
}