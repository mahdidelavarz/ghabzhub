import billCartModel from "../models/bill-cart.model"
import billModel from "../models/bill.model";
import shortid from "shortid";
import { createResponse } from "../utils/response.util";

export const createBill = async (userId: string) => {
    const cart = await billCartModel.findOne({ user_id: userId }),
        // cart
        cartItems = cart?.items;

    const session = await billModel.startSession()
    session.startTransaction()
    // create default bill if not exists
    const bill = await billModel.findOne({ user_id: userId })
    if (!bill) {
        await billModel.create({
            id: shortid.generate(),
            user_id: userId
        })
    }
    // Aggregating the entire shopping cart and breaking it down into pieces
    const billRecords: any[] = []
    cartItems?.forEach((item) => {
        billRecords.push({
            bill_id: item.details?.billId,
            payment_id: item.details?.paymentId,
            service: item.details?.service,
            label: item.details?.label,
            id: shortid.generate(),
            save_at: item.created_at,
            details: {
                ...item
            }
        })
    })
    await billModel.updateOne(
        {
            user_id: userId
        },
        {
            $push: {
                items: {
                    $each: billRecords
                }
            },
            $set: {
                updated_at: Date.now()
            }
        }
    )
    session.endSession()
}