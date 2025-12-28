import {Router, IRouter} from "express"
import auth from "../middlewares/auth.middleware"
// controllers
import {getBalance,getWalletHistory,getWallets, getPaymentsLog} from "../controllers/wallet/get.controller"
import walletDepositRequest from "../controllers/wallet/deposit.controller"
import walletVerifyDeposit from "../controllers/wallet/verify-deposit.controller"
import walletPay from "../controllers/wallet/pay.controller"

const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/wallet/balance
 * @Desc get wallet balance
 * @Method get
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @Role [user, admin]
 */
// @ts-expect-error
router.get('/balance' ,auth('user', 'admin') , getBalance)

/**
 * @Rawter
 * @Route /api/wallet/deposit/request
 * @Desc request deposit to the wallet
 * @Method post
 * @Body [amount]
 * @Query []
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-expect-error
router.post('/deposit/request' ,auth('user') , walletDepositRequest)

/**
 * @Rawter
 * @Route /api/wallet/deposit/verify
 * @Desc verify deposit and deposit in database
 * @Method get
 * @Body []
 * @Query [trackId]
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-expect-error
router.get('/deposit/verify' ,auth('user') , walletVerifyDeposit)

/**
 * @Rawter
 * @Route /api/wallet/pay
 * @Desc withdraw from wallet
 * @Method post
 * @Body [amount, billId]
 * @Query []
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-expect-error
router.post('/pay' ,auth('user') , walletPay)

/**
 * @Rawter
 * @Route /api/wallet
 * @Desc get wallets
 * @Method get
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.get('/' ,auth('user') , getWallets)

/**
 * @Rawter
 * @Route /api/wallet/history
 * @Desc get wallet histoy
 * @Method get
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @Role [user,admin]
 */
// @ts-expect-error
router.get('/history' ,auth('user', 'admin') , getWalletHistory)

/**
 * @Rawter
 * @Route /api/wallet/payments-log
 * @Desc get payments log
 * @Method get
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.get('/payments-log' ,auth('user', 'admin') , getPaymentsLog)
// @ts-ignore
export {router as wallet_router}