import shortid from "shortid"
import walletTransactionModel from "../models/wallet-transaction.model"
import walletModel from "../models/wallet.model"
import { TransactionWallet } from "../types/wallet"
import { dateToLocale } from "../utils/date.util"
import { createError } from "../utils/response.util"
import uuid from "uuid"
import { MongooseOptions } from "mongoose"
export const initialDefaultWallet = async (userId: string) => {
    if (!userId) {
        createError(400, 'enter user id for wallet', {
            statusText: 'bad-request'
        })
    }

    const wallet = await walletModel.findOne({ user_id: userId })
    if (!wallet) {
        await walletModel.create({
            user_id: userId,
            id: uuid.v4()
        })
        return true
    }
}

export const getWalletBalance = async (userId: string): Promise<{ id: string, balance: number | undefined, createdAt: string, updatedAt: string }> => {
    const wallet = await walletModel.findOne({ user_id: userId })
    return {
        id: wallet?.id,
        balance: wallet?.balance,
        createdAt: dateToLocale(Date.now(), 'fa-ir'),
        updatedAt: dateToLocale(Date.now(), 'fa-ir')
    }
}

export async function depositWallet(userId: string, amount: string | undefined) {
    const session = walletModel.startSession();
    (await session).startTransaction()
    await walletModel.findOneAndUpdate(
        {
            user_id: userId
        },
        {
            $inc: {
                balance: Number(amount)
            },
            $set: {
                updated_at: Date.now()
            }
        },
        {
            new: true
        }
    )

        ; (await session).endSession()
}

export const withdrawWallet = async (userId: string, amount: string) => {
    const session = walletModel.startSession()
        // start transaction session
        ; (await session).startTransaction()

    const negativeAmount = -Math.abs(+amount),
        walletBalance = await getWalletBalance(userId)
    if (Number(walletBalance.balance) < Number(amount)) {
        createError(400, 'موجودی کیف پول کافی نیست', { statusText: 'bad-request' })
    }

    await walletModel.findOneAndUpdate(
        { user_id: userId },
        {
            $inc: {
                balance: negativeAmount
            },
            $set: {
                updated_at: Date.now()
            }
        },
        { new: true }
    )

        ; (await session).endSession()
}

export const createWalletTransaction = async (walletData: TransactionWallet) => {
    const session = await walletTransactionModel.startSession()
    session.startTransaction()
    await walletTransactionModel.create({
        amount: (Math.ceil(Number(walletData.amount) / 1.1)).toString(),
        bill: walletData.billId,
        id: uuid.v4(),
        trackId: shortid.generate(),
        reference_id: walletData.referenecId,
        type: walletData.type,
        wallet_id: walletData.walletId,
        details: walletData.details
    })
    session.endSession()
}
