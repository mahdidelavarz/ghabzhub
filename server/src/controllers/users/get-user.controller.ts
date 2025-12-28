import type { Response, NextFunction } from "express";
import User from "../../models/user.model";
import { PartialRequest } from "../../types/request";
import { UserCollectionData } from "../../types/response";
import { createResponse } from "../../utils/response.util";
export default async function getUser(req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({id: req.userId}) as UserCollectionData
        res.status(201).json(
            createResponse(
                {code: 201, text: 'GET'},
                'اطلاعات کاربر',
                {
                    user: {
                        name: user.name || "",
                        family: user.family || "",
                        createdAt: user.created_at,
                        isActive: user.is_active,
                        phone: user.phone,
                        role: user.role,
                        userId: user.user_id
                    }
                }
            )
        )
    } catch (err) {
        next(err)
    }
}