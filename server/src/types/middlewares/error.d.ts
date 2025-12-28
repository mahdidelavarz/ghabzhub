interface CustomErrorData {
    message?: string
}

interface CustomError extends Error {
    success: boolean,
    statusCode: number | undefined,
    statusText?: string | undefined,
    status?: 'OK' | "NO" | undefined,
    data?: any | undefined
}

export { CustomError, CustomErrorData }