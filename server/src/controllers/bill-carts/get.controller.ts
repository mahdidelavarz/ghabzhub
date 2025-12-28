import shortid from "shortid";
import billCartModel from "../../models/bill-cart.model";
import { PartialRequest } from "../../types/request";
import { Response, NextFunction } from "express";
import { getCollection } from "../../services/collection.service";
import { createResponse } from "../../utils/response.util";
import { removeListener } from "process";

/**
 * 
 * @param req 
 * @param res 
 * @param next
 * @description create bill cart for paying
 * @return Promise 
 */
async function getBillCart (req: PartialRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0;

            if (req.role === 'user') {
                const cart = await getCollection(billCartModel, +limit, +page, sort , {
                    enable: true,
                    byRecord: {user_id: req.userId}
                })
                
                res.status(201).json(
                    createResponse(
                        {
                            code: 201,
                            text: "GET"
                        },
                        'سبد قبض',
                        {cart}
                    )
                )
            }
            // admin
            if (req.role === 'admin') {
                const carts = await getCollection(billCartModel, +limit, +page, sort , {})
                
                res.status(201).json(
                    createResponse(
                        {
                            code: 201,
                            text: "GET"
                        },
                        'کل سبد های قیض',
                        {carts}
                    )
                )
                
            }
    } catch(err) {
        next(err)
    }
}

export { getBillCart }