import type { Request, Response, NextFunction } from "express";
import { createError, createResponse } from "../../utils/response.util";
import User from "../../models/user.model";

export default async function getSingleUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId: string = req.params.id as string
        const user = await User.findOne({ id: userId })
        // check exists user
        if (!user) {
            createError(404, 'کاربری یافت نشد', { statusText: 'not-found' })
        }
        // returning user data
        res.status(201).json(
            createResponse({ code: 201, text: 'GET' }, 'کاربر', { user })
        )
    } catch (err) {
        next(err)
    }
}