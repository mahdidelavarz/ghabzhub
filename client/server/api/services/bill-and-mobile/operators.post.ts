export default defineEventHandler(async event => {
    try {
        const body = await readBody(event),
            operator = await getQuery(event).operator,
            config = useRuntimeConfig(event);
            
            if (!operator) {
                throw createError({statusCode: 400, message: "Please enter your operator"})
            }

            const request = await $fetch(
                `/billInquiry/mobile/${operator}`,
                {
                    baseURL: config.inquiryApiBase,
                    method: "post",
                    headers: {
                        token: config.inquiryToken,
                        'Content-Type': "application/json"
                    },
                    body: {
                        mobileNumber: body.mobileNumber
                  }
                }
            )
            return request
    } catch (err) {
        return {
            success: false,
            // @ts-ignore
            statusCode: err.statusCode,
            // @ts-ignore
            message: err.message
        }
    }
})