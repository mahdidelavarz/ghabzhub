import type { Request, Response, NextFunction } from "express"
import { generateToken, verifyToken, authorizeToken, handleExpiredToken } from "../../utils/jwt.util";
import User from "../../models/user.model";
import { createError, createResponse } from "../../utils/response.util";
import { initialDefaultWallet } from "../../services/wallet.service"
import { createMainCart, getCartByUserId } from "../../services/carts.service";

async function verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const body: { otp: string } = req.body || { otp: '' },
            token: string = authorizeToken(String(req.get('Authorization'))),
            payload = verifyToken(token, 'access')

        const user = await User.findOne({ id: payload?.userId })
        if (!user) {
            createError(404, "کاربری یافت نشد", {
                status: "NO",
                statusText: "not-found"
            })
        }

        // verify otp
        if (body.otp !== user?.otp) {
            createError(400, 'کد وارد شده اشتباه است', {
                status: "NO",
                statusText: "bad-request"
            })
        }
        const cart = await getCartByUserId(user?.id);
        // create default wallet if not exists
        initialDefaultWallet(user?.id)
        if (!cart) {
            await createMainCart(user?.id, 'open')
        }
        // generate token
        const accessToken = generateToken({ userId: user?.id, type: 'access', role: user?.role }, '30d', 'access'),
            refreshToken = generateToken({ userId: user?.id, type: 'refresh', role: user?.role }, '30d', 'refresh');

        // delete otp code from collection
        await User.findOneAndUpdate({ id: user?.id }, {
            $set: {
                otp: null
            }
        })

        // create success response
        res.status(201).json(
            createResponse(
                { code: 201, text: "CREATED" },
                'با موفقیت وارد شدید',
                {
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            )
        )
    } catch (err) {
        handleExpiredToken(err as Error, 'کد یک بار مصرف منقضی شده')
        next(err)
    }
}

// @ts-ignore
export default verifyOtp