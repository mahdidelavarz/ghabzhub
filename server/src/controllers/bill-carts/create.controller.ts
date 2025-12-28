import billCartModel from "../../models/bill-cart.model";
import { createBillCartItem, createMainCart, getCartByUserId } from "../../services/carts.service";
import { PartialRequest } from "../../types/request";
import { Response, NextFunction } from "express";
import { createError, createResponse } from "../../utils/response.util";
import Joi from "joi";
import shortid from "shortid";

/**
 * 
 * @param req 
 * @param res 
 * @param next
 * @description create bill cart for paying
 * @return Promise 
 */
async function createBillCart(req: PartialRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const body: { details: Object, amount: number } = req.body,
            cart = await getCartByUserId(req.userId),
            validate = Joi.object({
                details: Joi.required().messages({ 'any.required': 'مشخصات سبد باید وارد شوند' }),
                amount: Joi.number().min(100_000).required().messages({
                    'any.required': 'مقدار مبلغ قبض الزامی است',
                    'number.min': 'مقدار مبلغ نباید از 100,000 ریال کمتر باشد'
                })
            }).validate(body, { abortEarly: true, allowUnknown: false })
        if (validate.error) {
            if (validate.error.details.length > 0) {
                createError(400, 'خطای ورودی', {
                    statusText: 'bad-request',
                    data: validate.error.details
                })
            }
        }
        
        const checkRepeatBillId = await billCartModel.findOne({
            user_id: req.userId,
            // @ts-ignore
            'items.details.billId': body.details?.billId
        })
        if (checkRepeatBillId) {
            createError(400, 'این قبض قبلا به سبد قبض اضافه شده', {statusText: "bad-request"})
        }
        const newBillCartItem = {
            cart_id: shortid.generate(),
            details: body.details,
            amount: body.amount
        }
        await createBillCartItem(req.userId, newBillCartItem)
        res.status(201).json(
            createResponse(
                { code: 201, text: 'UPDATED' },
                'یک قبض به سبد اضافه شد'
            )
        )
    } catch (err) {
        next(err)
    }
}

export default createBillCart