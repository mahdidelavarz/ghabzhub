import { removeBillCart } from "../../services/carts.service";
import { PartialRequest } from "../../types/request";
import { Response, NextFunction } from "express";
import { createResponse } from "../../utils/response.util";
import { verifyUserForNextOperation } from "../../services/collection.service";
import billCartModel from "../../models/bill-cart.model";

/**
 * 
 * @param req 
 * @param res 
 * @param next
 * @description create bill cart for paying
 * @return Promise 
 */
async function deleteBillCartItem (req: PartialRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const id: string | undefined = req.params.id
        // await verifyUserForNextOperation(billCartModel , req.userId)
        await removeBillCart(req.userId, String(id))
        res.status(201).json(
            createResponse({code: 201, text: 'DELETED'} , 'قبض حذف شد')
        )
    } catch(err) {
        next(err)
    }
}

export default deleteBillCartItem