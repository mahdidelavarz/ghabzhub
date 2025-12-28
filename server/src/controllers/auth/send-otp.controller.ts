import User from "../../models/user.model"
import sID from "shortid"
import uuid from "uuid"
import Joi from "joi"
import type { NextFunction, Request, Response } from "express";
import { createError, createResponse } from "../../utils/response.util";
import { generateOTP } from "../../utils/otp.util";
import { generateToken } from "../../utils/jwt.util";
import { sendSms } from "../../config/sms.config";
import { otpTemplate } from "../../utils/sms.util";

export default async function sendOTP(req: Request, res: Response, next: NextFunction) {
    try {
        const body: { phone: string } = req.body || { phone: '' },
            validate = Joi.object({
                phone: Joi.string().empty().regex(new RegExp(/^09\d{9}$/)).messages({
                    'string.pattern.base': 'شماره موبایل خود را به درستی وارد کنید',
                    'string.empty': 'شماره موبایل را وارد کنید'
                }),
            }).validate(body, { allowUnknown: false, abortEarly: true })

        // check validation
        if (validate.error && validate.error.details.length > 0) {
            createError(400, validate.error.message, {
                status: "NO",
                statusText: "bad-request",
                data: validate.error.details
            })
        }

        // check exists user
        const user = await User.findOne({ phone: body.phone }),
            otp = generateOTP(6)
        // if not exists user
        if (!user) {
            const newUserID = uuid.v4()
            // create new user
            await User.create({
                id: newUserID,
                user_id: sID.generate(),
                phone: body.phone,
                otp
            })

            const token = generateToken({ userId: newUserID, role: 'user' }, '2m', 'access')
            // send otp code with sms

            await sendSms(otpTemplate(otp), [body.phone])
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
        }
        // if exists user
        await User.findOneAndUpdate({ id: user?.id }, {
            $set: {
                otp
            }
        })
        const token = generateToken({ userId: user?.id, role: user?.role }, '2m', 'access')
        // send otp with sms

        await sendSms(otpTemplate(otp), [body.phone])
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