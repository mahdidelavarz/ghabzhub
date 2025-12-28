import type { Response, NextFunction } from "express";
import { getWalletBalance } from "../../services/wallet.service";
import { PartialRequest } from "../../types/request";
import { createResponse } from "../../utils/response.util";
import { getCollection } from "../../services/collection.service";
import walletTransactionModel from "../../models/wallet-transaction.model";
import walletModel from "../../models/wallet.model";
import paymentLogsModel from "../../models/payment-logs.model";

export const getBalance = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const balance = await getWalletBalance(req.userId)
        
        res.status(201).json(
            createResponse(
                {code: 201, text: 'GET'},
                'موجودی کیف پول',
                {
                    wallet: balance
                }
            )
        )
    } catch (err) {
        next(err)
    }
}

export async function getWalletHistory(req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0

        let walletHistory;
        const userWallet = await getWalletBalance(req.userId)

        if (req.role === 'admin') {
            walletHistory = await getCollection(walletTransactionModel, +limit, +page, sort, {})
        } else if (req.role === 'user') {
            walletHistory = await getCollection(walletTransactionModel, +limit, +page, sort, {
                enable: true,
                byRecord: { wallet_id: userWallet.id }
            })
        }
        res.status(201).json(
            createResponse(
                { code: 201, text: 'GET' },
                'گزارش های کیف پول',
                {
                    history: walletHistory
                }
            )
        )
    } catch (err) {
        next(err)
    }
}

export async function getWallets (req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0
            
            const wallets = await getCollection(walletModel, +limit, +page, sort , {})
            res.status(201).json(
                createResponse(
                {code: 201, text: 'GET'},
                'کیف پول',
                {
                    wallets
                }
            )
        )
    } catch(err) {
        next(err)
    }
}

export async function getPaymentsLog (req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0
            
        let payLogs;
        if (req.role === 'admin') {
            payLogs = await getCollection(paymentLogsModel, +limit,+page, sort, {})
        } else {
            payLogs = await getCollection(paymentLogsModel, +limit,+page, sort, {
                enable: true,
                byRecord: {user_id: req.userId}
            })
        }

        res.status(201).json(
            createResponse(
                {code: 201, text: 'GET'},
                'تراکنش های انجام شده',
                {
                    logs: payLogs
                }
            )
        )
    } catch(err) {
        next(err)
    }
}