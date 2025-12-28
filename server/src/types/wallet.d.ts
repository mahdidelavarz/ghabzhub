export interface TransactionWallet {
    walletId: string,
    amount: string,
    type: 'withdraw' | 'deposit',
    billId?: string,
    referenecId?: string,
    details?: object
}