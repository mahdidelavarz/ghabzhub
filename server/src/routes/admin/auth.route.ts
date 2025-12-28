import {Router, IRouter} from "express"
import { login } from "../../controllers/admin/auth.controller"
import auth from "../../middlewares/auth.middleware"

const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/admin/auth/login
 * @Desc login admins
 * @Method post
 * @Body [username,password]
 * @Query []
 */
// @ts-ignore
router.post('/auth/login',login)

// @ts-ignore
export {router as adminAuth_router}