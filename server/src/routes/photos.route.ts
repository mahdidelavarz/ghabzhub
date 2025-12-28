import {Router, IRouter} from "express"
import fileUpload from "express-fileupload"
import auth from "../middlewares/auth.middleware"
// controllers
import uploadPhotos from "../controllers/photos/upload.controller"
import removeFile from "../controllers/photos/delete.controller"
import { getPhotos } from "../controllers/photos/get.controller"

const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/media/upload
 * @Desc upload media
 * @Method post
 * @Body [image]
 * @Query []
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.post('/photo/upload' ,auth('user') ,fileUpload({}) , uploadPhotos)

/**
 * @Rawter
 * @Route /api/media
 * @Desc delete media
 * @Method delete
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @Role [admin]
 * @params [id]
 */
// @ts-expect-error
router.delete('/:id' ,auth('user') , removeFile)

/**
 * @Rawter
 * @Route /api/media/photo
 * @Desc get all photos
 * @Method get
 * @Body []
 * @Query [limit, sort,page]
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.get('/photo' ,auth('user') , getPhotos)

export {router as media_router}