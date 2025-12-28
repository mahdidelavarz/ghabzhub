import {Router, IRouter} from "express"
import auth from "../middlewares/auth.middleware"
// controllers
const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/bill-cart
 * @Desc create bill cart
 * @Method post
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-expect-error
router.post('/confirm' ,auth('admin') , createBillCart)

export {router as bill_router}