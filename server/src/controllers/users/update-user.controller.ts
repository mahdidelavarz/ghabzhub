import type { Response, NextFunction } from "express";
import Joi from "joi";
import User from "../../models/user.model";
import { PartialRequest } from "../../types/request";
import { UserCollectionData } from "../../types/response";
import { createError, createResponse } from "../../utils/response.util";

export default async function updateUser(req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const body: Partial<UserCollectionData> = req.body,
            query: Partial<{ admin: boolean, id: string }> = req.query,
            validate = Joi.object({
                name: Joi.string().required().empty().messages({
                    'string.empty': 'نام الزامی است',
                    'any.required': 'نام الزامی است'
                }),
                family: Joi.string().required().empty().messages({
                    'string.empty': 'فامیلی الزامی است',
                    'any.required': 'فامیلی الزامی است'
                })
            }).validate(body, { abortEarly: true, allowUnknown: false })

        // check validation
        if (validate.error && validate.error.details.length > 0) {
            createError(400, validate.error.message, {
                status: "NO",
                statusText: "bad-request",
                data: validate.error.details
            })
        }
        const user = await User.findOne({ id: req.userId }) as UserCollectionData

        if (user.role === 'user') {
            await User.findOneAndUpdate({ id: req.userId }, {
                $set: {
                    name: body.name,
                    family: body.family
                }

            })

            res.status(201).json(
                createResponse(
                    { code: 201, text: 'UPDATED' },
                    'اطلاعات با موفقیت ثبت شدند',
                    {
                        user: {
                            name: user.name,
                            family: user.family,
                            role: user.role
                        }
                    }
                )
            )
        }

        // by admin role
        if (user.role === 'admin') {
            if (!query.admin && !query.id) {
                createError(400, 'برای دسترسی اطلاعات لازم وارد شود', {
                    statusText: 'bad-request',
                    status: 'NO'
                })
            }
            await User.findOneAndUpdate({ id: req.userId }, {
                $set: {
                    name: body.name,
                    family: body.family,
                    updated_at: Date.now(),
                    is_active: body.is_active || false,
                    role: body.role || 'user',
                    ...body
                }
            })
            res.status(201).json(
                createResponse(
                    { code: 201, text: 'UPDATED' },
                    'اطلاعات با موفقیت ثبت شدند'
                )
            )
        }
    } catch (err) {
        next(err)
    }
}