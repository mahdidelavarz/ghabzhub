import {Router, IRouter} from "express"
// controllers
import verifyPayment from "../controllers/callback/payment.controller"
const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/callback/payment
 * @Desc verify payment and return to main site
 * @Method get
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-ignore
router.get('/payment', verifyPayment)

// @ts-ignore
export {router as callback_router}