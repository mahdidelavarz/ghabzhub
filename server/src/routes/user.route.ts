import {Router, IRouter} from "express"
import auth from "../middlewares/auth.middleware"
// controllers
import getUser from "../controllers/users/get-user.controller"
import updateUser from "../controllers/users/update-user.controller"
import getUsers from "../controllers/users/get-users.controller"
import getSingleUser from "../controllers/users/get-single-user.controller"

const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/user
 * @Desc get user information
 * @Method get
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @Role [user]
 */
// @ts-expect-error
router.get('/' ,auth('user') , getUser)

/**
 * @Rawter
 * @Route /api/user
 * @Desc update user
 * @Method put
 * @Body []
 * @Query [admin, id]
 * @Header [Authorization]
 * @Role [user,admin]
 */
// @ts-expect-error
router.put('/' ,auth('admin', 'user') , updateUser)

/**
 * @Rawter
 * @Route /api/user/users
 * @Desc get all users
 * @Method get
 * @Body []
 * @Query [sortBy,sort,limit,page]
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.get('/users' ,auth('admin') , getUsers)

/**
 * @Rawter
 * @Route /api/user/:id
 * @Desc get single user
 * @Method get
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.get('/:id' ,auth('user') , getSingleUser)

// @ts-ignore
export {router as user_router}