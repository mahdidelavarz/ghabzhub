import type { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { createError, createResponse } from "../../utils/response.util";
import { initialPaymentLog, requestPayment } from "../../services/payment.service";
import uuid from "uuid"

const walletDepositRequest = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const body: { amount: string } = req.body,
            minAmount = 10_000;
        if (!body || !body.amount) {
            createError(400, 'میزان مبلغی که میخواهید واریز کنید را وارد کنید', {
                statusText: "bad-request"
            })
        }

        // The amount should not be less than 10,000 Tomans.
        if (body.amount < Number(minAmount).toString()) {
            createError(400, `مقدار مبلغ باید بیشتر از ${minAmount} باشد`, {
                statusText: 'WALLET_MIN_DEPOSIT_REQUIRED'
            })
        }
        try {
            const paymentLogId = uuid.v4(),
                taxCalculate = (Number(body.amount) * 0.1)
                
            // request to api
            const requestDepositPayment = await requestPayment(String(Number(body.amount) + taxCalculate),paymentLogId + "&" + req.userId)

            if (requestDepositPayment.data?.result == 100) {
                // save the log in transaction
                await initialPaymentLog(paymentLogId, req.userId, body.amount, requestDepositPayment.data?.trackId)
                res.status(201).json(
                    createResponse(
                        { code: 201, text: 'CREATED' },
                        'لینک پرداخت تولید شد',
                        {
                            payment: {
                                amount: body.amount,
                                link: `https://gateway.zibal.ir/start/${requestDepositPayment.data?.trackId}`
                            }
                        }
                    )
                )
            } else {
                console.log(requestDepositPayment.data);
                
                createError(400, 'خطایی در شارژ کیف پول رخ داده است', { statusText: 'WALLET_GENERIC_ERROR' })
            }

        } catch (err) {
            createError(400, 'خطایی در سرور رخ داده', {
                statusText: "bad-request"
            })
        }
    } catch (err) {
        next(err)
    }
}

export default walletDepositRequest