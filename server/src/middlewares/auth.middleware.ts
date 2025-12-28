import type { Response, NextFunction } from "express";
import { authorizeToken, handleExpiredToken, verifyToken } from "../utils/jwt.util";
import { PartialRequest } from "../types/request";
import { createError } from "../utils/response.util";
import userModel from "../models/user.model";
import adminUsersModel from "../models/admin-users.model";
export default function auth(...allowRoles: ('user' | 'admin')[]) {
    return async function (req: PartialRequest, res: Response, next: NextFunction) {
        try {
            const authorization: string = String(req.get("Authorization")),
                token = authorizeToken(authorization),
                decode = verifyToken(token, 'access'),
                userRole = decode?.role;
            // check token type
            if (decode?.type !== 'access') {
                createError(401, 'وارد حساب کاربری خود شوید', {
                    statusText: 'unauthorized'
                })
            }
            // limit user
            if (userRole && !allowRoles.includes(userRole)) {
                createError(401, 'دسترسی محدود است', {
                    statusText: 'unauthorized'
                })
            }
            // check exists user
            const user = decode?.role == 'admin' ?
                await adminUsersModel.findOne({user_id: decode?.userId}) :
                await userModel.findOne({ id: decode?.userId })
            if (!user) {
                createError(401, 'لطفا وارد حساب کاربری خود شوید', {
                    statusText: "unauthorized"
                })
            }
            // check active and deactive user
            if (user?.is_active === false) {
                createError(401, 'حساب کاربری مسدود است از طریق پشتیبانی اقدام کنید', {})
            }
            // set user id for public application
            req.userId = decode?.userId
            req.role = decode?.role
            // to next middleware
            // @ts-ignore
            if (user?.access_level) {
                // @ts-ignore
                req.level = user?.access_level
            }
            next()
        } catch (err) {
            handleExpiredToken(err as Error, 'وارد حساب خود شوید')
            next(err)
        }
    }
}