type StatusCode =
    200 |
    201 |
    204 |
    400 |
    401 |
    403 |
    404 |
    409 |
    429 |
    500 |
    503

type StatusText =
    "ok"
    | "created"
    | "no-content"
    | "bad-request"
    | "unauthorized"
    | "forbidden"
    | "not-found"
    | "conflict"
    | "WALLET_MIN_DEPOSIT_REQUIRED"
    | "WALLET_GENERIC_ERROR"
    | "PAYMENT_ALREADY_VERIFIED"
    | "PAYMENT_INVALID_TRACKID"
    | "PAYMENT_VERIFICATION_FAILED"
    | "unprocessable-entity"
    | "too-many-request"
    | "internal-server-error"
    | "service-unavalable"

type SuccessStatusText = 'CREATED' | 'GET' | 'UPDATED' | 'DELETED'
interface CreateResponseResult {
    statusCode: StatusCode,
    message: string,
    statusText: SuccessStatusText,
    success: boolean,
    data: any
}
export { StatusCode, StatusText, CreateResponseResult,SuccessStatusText }