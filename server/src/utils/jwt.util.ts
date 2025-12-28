import jwt from 'jsonwebtoken'
import {createError} from "./response.util";
export function generateToken (payload: Object, expire: any, type: 'access' | 'refresh'): string {
    const tokenType = type === 'access' ? process.env.JWT_SECRET : process.env.JWT_REFRESH
    return jwt.sign(payload, String(tokenType), {
        expiresIn: expire
    })
}

export function verifyToken (token: string ,type: 'access' | 'refresh'): any {
    const tokenType = type === 'access' ? process.env.JWT_SECRET : process.env.JWT_REFRESH
    return jwt.verify(token, String(tokenType), {})
}

export function authorizeToken (authorization: string): any {
    if (authorization.split(' ').length < 2) {
        createError(400, 'خطای دسترسی', {
            statusText: 'bad-request',
            status: 'NO'
        })
    }

    return authorization.split(' ')[1]
}

export const handleExpiredToken = (err: Error, message: string)=> {
    if (err.message === 'jwt expired') {
        createError(400 ,message, {
            statusText: 'bad-request',
            status: 'NO'
        })
    }
}