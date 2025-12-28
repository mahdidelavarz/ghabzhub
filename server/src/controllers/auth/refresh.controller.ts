import {generateToken, handleExpiredToken, verifyToken} from "../../utils/jwt.util";
import type {NextFunction, Request, Response} from "express";
import {createError, createResponse} from "../../utils/response.util";

async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // @ts-expect-error
        const query: { token: string } = req.query || {token: ''}
        if (!query.token) {
            createError(400 ,'کلید دسترسی را وارد کنید', {
                statusText: 'bad-request'
            })
        }

        const decodedToken = verifyToken((query.token as String).trim(), 'refresh')
        if (decodedToken?.type !== 'refresh') {
            createError(400 ,'کلید دسترسی نامعتبر است', {
                statusText: 'bad-request'
            })
        }
        const accessToken = generateToken({userId: decodedToken.userId, type: 'access', role: decodedToken.role}, '30d', 'access'),
            refreshToken = generateToken({userId: decodedToken.userId, type: 'refresh', role: decodedToken.role}, '30d', 'refresh');

        // create success response
        res.status(201).json(
            createResponse(
                {code: 201, text: "CREATED"},
                'دسترسی جدید صادر شد',
                {
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            )
        )
    } catch (err) {
        handleExpiredToken(err as Error, 'خطای دسترسی')
        next(err)
    }
}

// @ts-ignore
export default refreshToken