import billCartModel from "../models/bill-cart.model"
import { createError } from "../utils/response.util"
import uuid from "uuid"

export const getCartByUserId = async (userId: string) => {
    const cart = await billCartModel.findOne({ user_id: userId })
    return cart
}

export const createMainCart = async (userId: string, status: 'close' | 'open') => {
    if (!userId) {
        createError(400, 'شناسه کاربر مورد نظر را وارد کنید', {
            statusText: 'bad-request'
        })
    }
    // create default main cart
    const session = await billCartModel.startSession()
    session.startTransaction()
    await billCartModel.create({
        id: uuid.v4(),
        user_id: userId,
        status
    })
    session.endSession()
    return true
}

export const createBillCartItem = async (userId: string, newCart: object) => {
    if (!userId) {
        createError(400, 'شناسه کاربر مورد نظر را وارد کنید', {
            statusText: 'bad-request'
        })
    }
    const session = await billCartModel.startSession()
    session.startTransaction()
    // update and push a cart item
    await billCartModel.findOneAndUpdate(
        { user_id: userId },
        {
            $push: {
                items: newCart
            },
            $set: {
                updated_at: Date.now()
            }
        },
        { new: true }
    );

    session.endSession()
}
export const removeBillCart = async (userId: string, cartId: string) => {
    const session = await billCartModel.startSession()
    session.startTransaction()
    const cart = await billCartModel.findOne({ user_id: userId, 'items.cart_id': cartId })
    if (!cart) {
        createError(404, 'موردی برای حذف پیدا نشد', { statusText: "not-found" })
    }
    // delete cart item
    await billCartModel.findOneAndUpdate(
        { user_id: userId },
        {
            $pull: {
                items: {
                    cart_id: cartId
                }
            }
        }
    )
    session.endSession()
}

export const clearAllBillCarts = async (userId: string) => {
    const session = await billCartModel.startSession()
    session.startTransaction()
    await billCartModel.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                items: []
            }
        }
    )
    session.endSession()
}
export const changeBillCartStatus = async (userId: string, status: 'open' | 'close'): Promise<void> => {
    if (
        ![' open', 'close'].includes(status)
    ) {
        createError(400, 'وضعیت قبض را به درستی مشخص کنید', {
            statusText: 'bad-request'
        })
    }
    const session = await billCartModel.startSession()
    session.startTransaction()
    await billCartModel.findOneAndUpdate(
        { user_id: userId },
        {
            $set: {
                status: status
            }
        }
    )
    session.endSession()
}