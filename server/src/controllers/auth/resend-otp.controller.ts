import User from "../../models/user.model"
import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express";
import { createError, createResponse } from "../../utils/response.util";
import { generateOTP } from "../../utils/otp.util";
import { generateToken } from "../../utils/jwt.util";
import { sendSms } from "../../config/sms.config";
import { otpTemplate } from "../../utils/sms.util";

export default async function resendOTP(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationToken = req.get("Otp-Token")

        if (!authorizationToken) {
            createError(401, 'کلید را وارد کنید', {
                status: "NO",
                statusText: "unauthorized"
            })
        }

        const decode = jwt.decode(String(authorizationToken)) as { userId: string, role: string },
            user = await User.findOne({ id: decode.userId })

        console.log(user);

        if (!user) {
            createError(400, 'خطایی رخ داده ', {
                status: "NO",
                statusText: "bad-request"
            })
        }
        // save new code for user
        const newOtp = generateOTP(6)
        await User.findOneAndUpdate(
            {
                id: user?.id
            },
            {
                $set: {
                    otp: String(newOtp)
                }
            }
        )

        const token = generateToken({ userId: user?.id, role: 'user' }, '2m', 'access');
        await sendSms(otpTemplate(newOtp), [String(user?.phone)])

        await
            res.status(201).json(
                createResponse(
                    {
                        code: 201,
                        text: 'CREATED'
                    },
                    'رمز یک بار مصرف ارسال شد',
                    { token }
                )
            )
    } catch (err) {
        next(err)
    }
}