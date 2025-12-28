import type { Response, NextFunction } from "express";
import type { PartialRequest } from "../../types/request";
import { changePaymentStatus, requestPaymentVerify } from "../../services/payment.service";
import { createWalletTransaction, depositWallet, getWalletBalance } from "../../services/wallet.service";
export default async function verifyPayment(req: PartialRequest, res: Response, next: NextFunction) {
    const trackId = req.query?.trackId,
        orderId = req.query?.orderId as String
    if (!trackId || !orderId) {
        res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=0')
    }

    const splitOrderId = orderId.split("&")
    if (splitOrderId.length < 2) {
        res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=0')
    }

    try {
        const verify = await requestPaymentVerify(String(trackId))
        if (verify.data.result === 201) {
            res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=2')
        }
        if (verify.data.result === 100 && verify.data.status === 1) {
            const wallet = await getWalletBalance(String(splitOrderId[1]))
            // change payment status in payment logs collection 
            await changePaymentStatus(String(splitOrderId[0]), 'success')
            await createWalletTransaction({
                amount: verify.data?.amount,
                referenecId: String(trackId),
                type: 'deposit',
                walletId: wallet.id // wallet id
            })

            await depositWallet(String(splitOrderId[1]), (Math.ceil(Number(verify.data?.amount) / 1.1)).toString())
            res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=1')
        } else if ([102, 103, 104, 203, 202].includes(verify.data.result)) {
            await changePaymentStatus(String(splitOrderId[0]), 'failed')
            res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=0')
        } else {
            await changePaymentStatus(String(splitOrderId[0]), 'success')
            res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=0')
        }

    } catch (err) {
        res.redirect(process.env.PAYMENT_CALLBACK_URL + '?success=0')
    }
} 