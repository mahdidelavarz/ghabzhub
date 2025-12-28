import e, { Request, Response, NextFunction } from "express"
import { CustomError } from "../types"
const error = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const err = {
        message: error.message,
        success: error.success,
        stack: process.env.NODE_ENV === 'production' ? error.stack : '',
        statusCode: error.statusCode,
        data: error.data,
        statusText: error.statusText,
        status: error.status,
    }

    res.json(err)
}

export default error