import {Router, IRouter} from "express"
import auth from "../middlewares/auth.middleware"
// controllers
import createBillCart from "../controllers/bill-carts/create.controller"
import deleteBillCartItem from "../controllers/bill-carts/delete.controller"
import { getBillCart } from "../controllers/bill-carts/get.controller"

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
router.post('/' ,auth('user') , createBillCart)

/**
 * @Rawter
 * @Route /api/bill-cart
 * @Desc delete bill cart
 * @Method delete
 * @Body []
 * @params [id]
 * @Query []
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-expect-error
router.delete('/:id' ,auth('user') , deleteBillCartItem)

/**
 * @Rawter
 * @Route /api/bill-cart
 * @Desc get bill cart or carts
 * @Method get
 * @Body []
 * @params []
 * @Query []
 * @Header [Authorization]
 * @Role [user, admin]
 */
// @ts-expect-error
router.get('/' ,auth('user', 'admin') , getBillCart)

export {router as carts_router}