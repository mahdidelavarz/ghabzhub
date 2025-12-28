import {CreateResponseResult, CustomError, StatusCode, StatusText, SuccessStatusText} from "../types"

export const createError = (statusCode: StatusCode, message: string, options: {
    statusText?: StatusText,
    status?: "OK" | "NO",
    data?: any
}) => {
    const error = new Error(message) as CustomError
    error.statusCode = statusCode
    error.success = false
    error.status = options.status
    error.statusText = options.statusText
    error.data = options?.data
    // throw new error
    throw error
}

export const createResponse = (status: { code: StatusCode, text: SuccessStatusText }, message: string, data?: any | {}): CreateResponseResult => {
    return {
        statusCode: status.code,
        statusText: status.text,
        message,
        success: true,
        data
    }
}