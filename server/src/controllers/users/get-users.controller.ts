import type { Request, Response, NextFunction } from "express";
import { createResponse } from "../../utils/response.util";
import User from "../../models/user.model";

export default async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const sortUser = req.query.sort === 'asc' ? 1 : -1;
        const sortBy = '_id';
        const limit = parseInt(req.query.limit as string) || 0;
        const page = parseInt(req.query.page as string) || 1;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .sort({ [sortBy]: sortUser })
            .skip(skip)
            .limit(limit);

        res.status(200).json(
            createResponse(
                { code: 200, text: 'GET' },
                'کاربران',
                { users }
            )
        );
    } catch (err) {
        next(err);
    }
}