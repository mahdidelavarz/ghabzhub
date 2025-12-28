import type { Response, NextFunction } from "express"
import type { PartialRequest } from "../../types/request"
import { AdminBody, LoginBody } from "../../types/auth"
import { validateAdminBody } from "../../services/auth.service"
import { createError, createResponse } from "../../utils/response.util"
import adminUsersModel from "../../models/admin-users.model"
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/jwt.util"

// register a admin
export const createAdmin = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const body = req.body as AdminBody,
            // validate
            validate = validateAdminBody(body);
        if (validate.error) {
            if (validate.error.details.length > 0) {
                createError(400, 'خطای اعتبار سنجی', {
                    statusText: 'bad-request',
                    data: {
                        errors: validate.error.details
                    }
                })
            }
        }
        // check exists duplicate username
        const user = await adminUsersModel.findOne({ username: body.username })
        if (user) {
            createError(400, 'نام کاربری مشابه با این نام ثبت شده', { statusText: 'bad-request' })
        }

        // check
    } catch (err) {
        next(err)
    }
}

// login admin
export const login = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const body = req.body as LoginBody
        if (!body.username || !body.password) {
            createError(400, 'اطلاعات ورود به حساب را وارد کنید', { statusText: 'bad-request' })
        }

        const user = await adminUsersModel.findOne({ username: body.username })
        if (!user) {
            createError(401, 'نام کاربری یا رمز عبور اشتباه است', { statusText: "unauthorized" })
        }

        if (!bcrypt.compareSync(String(body.password), String(user?.password))) {
            createError(401, 'نام کاربری یا رمز عبور اشتباه است', { statusText: 'unauthorized' })
        }

        // generate token
        const accessToken = generateToken({ userId: user?.user_id, type: 'access', role: user?.role }, '30d', 'access'),
            refreshToken = generateToken({ userId: user?.user_id, type: 'refresh', role: user?.role }, '30d', 'refresh');

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
        next(err)
    }
}

// get single admin
export const getSingleAdmin = (req: PartialRequest, res: Response, next: NextFunction) => {

}

// get all admin
export const getAdmins = (req: PartialRequest, res: Response, next: NextFunction) => {

}

// edit admin information
export const editAdmin = (req: PartialRequest, res: Response, next: NextFunction) => {

}

// remove admin
export const removeAdmin = (req: PartialRequest, res: Response, next: NextFunction) => {

}