import type { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { createError, createResponse } from "../../utils/response.util";
import { createWalletTransaction, getWalletBalance, withdrawWallet } from "../../services/wallet.service";
import { getCollection } from "../../services/collection.service";
import { changeBillCartStatus, clearAllBillCarts, getCartByUserId } from "../../services/carts.service";
import { createBill } from "../../services/bill.service";

async function walletPay(req: PartialRequest, res: Response, next: NextFunction) {
    try {

        const cart = await getCartByUserId(req.userId)
        let detailsItems: { details: object, amount: string }[] = []
        if (cart?.items) {
            if (cart.items.length < 1) {
                createError(404, 'حداقل یک قبض را به سبد قبض اضافه کنید', {
                    statusText: "not-found"
                })
            }
            // get details for all and push to detailsItems
            cart.items.forEach(c => {
                detailsItems.push({
                    amount: String(c.amount),
                    details: c.details
                })
            })
        }
        // get total bill cart
        const totalEstimatedAmount = cart?.total_estimated_amount,
            wallet = await getWalletBalance(req.userId);
        // withdraw
        await withdrawWallet(req.userId, String(totalEstimatedAmount))
        // create report
        await createWalletTransaction({
            details: detailsItems,
            amount: String(totalEstimatedAmount),
            walletId: wallet.id,
            type: 'withdraw',
        })
        // change bill cart status
        await changeBillCartStatus(req.userId, 'close')
        await createBill(req.userId)
        await clearAllBillCarts(req.userId)

        /**
         * some code [more operation]
         */

        res.status(201).json(
            createResponse(
                {
                    code: 201,
                    text: "UPDATED"
                },
                'قبض های شما با موفقیت پرداخت شدند',
                {}
            ))
    } catch (err) {
        next(err)
    }
}

export default walletPay