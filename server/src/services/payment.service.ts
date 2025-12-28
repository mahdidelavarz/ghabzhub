import shortid from "shortid";
import paymentLogsModel from "../models/payment-logs.model";
import axios from "axios";
import { AxiosResponse } from "axios";
import { createError } from "../utils/response.util";
export async function initialPaymentLog(id: string, userId: string, amount: string, referenceId: string): Promise<boolean> {
    await paymentLogsModel.create({
        trackId: shortid.generate(),
        id,
        user_id: userId,
        amount,
        reference_id: referenceId,
        status: 'pending'
    })
    return true
}

export async function changePaymentStatus(paymentLogId: string, status: 'pending' | 'success' | 'failed') {
    const session = await paymentLogsModel.startSession()
    session.startTransaction()
    await paymentLogsModel.findOneAndUpdate({ id: paymentLogId }, {
        $set: {
            status
        }
    })
    session.endSession()
}

export async function requestPayment(amount: string, orderId: string): Promise<Pick<AxiosResponse, 'data' | 'status'>> {
    const request = await axios.post(String(process.env.ZIBAL_REQUEST_URL), {
        merchant: process.env.MERCHANT || 'zibal',
        amount: +amount,
        orderId,
        callbackUrl: process.env.ZIBAL_CALLBACK_URL
    })

    return {
        data: request.data,
        status: request.status
    }
}

export async function requestPaymentVerify(trackId: string | undefined): Promise<Pick<AxiosResponse, 'data' | 'status'>> {
    const request = await axios.post(String(process.env.ZIBAL_VERIFY_URL), {
        merchant: process.env.MERCHANT || 'zibal',
        trackId
    })
    
    return {
        data: request.data,
        status: request.status
    }
}

export const handlePaymentVerifyResponse = (verify: AxiosResponse) => {
    if (verify.data?.result === 201) {
        createError(400, 'این تراکنش قبلا تایید شده', {
            statusText: 'PAYMENT_ALREADY_VERIFIED'
        })
    }

    if (verify.data?.result === 203) {
        createError(400, 'شناسه پرداختی نامعتبر است', {
            statusText: "PAYMENT_INVALID_TRACKID"
        })
    }

    if (verify.data?.result === 202) {
        createError(400, 'پرداخت انجام نشد', { statusText: 'PAYMENT_VERIFICATION_FAILED' , data: {payment: verify.data} })
    }
}