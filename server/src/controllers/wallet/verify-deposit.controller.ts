import type { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { createError, createResponse } from "../../utils/response.util";
import { changePaymentStatus, handlePaymentVerifyResponse, requestPaymentVerify } from "../../services/payment.service";
import { createWalletTransaction, depositWallet, getWalletBalance } from "../../services/wallet.service";
import { AxiosResponse } from "axios";

async function walletVerifyDeposit(req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const query: { trackId?: string } = req.query

        if (!('trackId' in query) && !query.trackId) {
            createError(400, 'خطایی در دریافت شناسه رخ داده', {
                statusText: 'bad-request'
            })
        }
        
        const verify = await requestPaymentVerify(query.trackId) as AxiosResponse

        // handle verify states
        handlePaymentVerifyResponse(verify)

        if (verify.data?.status === 1) {
            // get wallet
            const wallet = await getWalletBalance(req.userId)
            // change payment status in payment logs collection 
            await changePaymentStatus(req.userId, 'success')
            await createWalletTransaction({
                amount: verify.data?.amount,
                referenecId: String(query.trackId),
                type: 'deposit',
                walletId: wallet.id // wallet id
            })
            await depositWallet(req.userId, verify.data?.amount)

            res.status(201).json(
                createResponse(
                    { code: 201, text: 'UPDATED' },
                    'کیف پول شارژ شد'
                )
            )
        }
    } catch (err) {
        next(err)
    }
}

export default walletVerifyDeposit