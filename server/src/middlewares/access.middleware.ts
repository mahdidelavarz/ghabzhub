import { Request, Response, NextFunction } from "express"
import { createError } from "../utils/response.util"

function accessApi (req: Request, res: Response, next: NextFunction) {
    const secretKey = req.get("x-secret-key")
    
    if (secretKey !== process.env.ACCESS_API_SECRET) {
        createError(400, 'خطای دسترسی' , {})
    }
    next()
}

export default accessApi