import { createError } from "../utils/response.util"

export const getCollection = async (Collection: any, limit?: number, page?: number, sort?: string | number, user?: { enable?: boolean, byRecord?: Object }): Promise<any> => {
    const args = {
        limit: limit || 0,
        page: page || 1,
        sort: sort || 1,
        userEnable: user?.enable,
        byRecord: user?.byRecord
    }

    const col = await Collection.find(args.userEnable ? user?.byRecord : null)
        .sort({ '_id': args.sort })
        .skip((args.page - 1) * args.limit)
        .limit(args.limit)

    return col
}

export const verifyUserForNextOperation = async (collection: any, userId: string) => {
    const col = await collection.findOne({ user_id: userId })
    if (userId !== col?.user_id) {
        createError(400, 'با حساب خود وارد شوید', {})
    }
    // if (!col)
}