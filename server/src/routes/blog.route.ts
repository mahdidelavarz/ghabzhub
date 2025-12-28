import {Router, IRouter} from "express"
import auth from "../middlewares/auth.middleware"
// controllers
import { createCategory, deleteCategory, editCategory, getCategories } from "../controllers/blog/category.controller"
import createPost from "../controllers/blog/post-create.controller"
import { getAllPosts, getPublishedPosts, getSinglePost } from "../controllers/blog/get-post.controller"
import deleteBlogPost from "../controllers/blog/delete-post.controller"
import updateBlogPost from "../controllers/blog/edit-post.controller"
import { changeBlogCommentStatus, createComment } from "../controllers/blog/comment.controller"

const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/blog/category
 * @Desc create category
 * @Method post
 * @Body [label]
 * @Query []
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.post('/category' ,auth('admin') , createCategory)

/**
 * @Rawter
 * @Route /api/blog/category
 * @Desc edit category
 * @Method put
 * @Body [label]
 * @Query []
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.put('/category/:id' ,auth('admin') , editCategory)

/**
 * @Rawter
 * @Route /api/blog/category
 * @Desc get catrgories
 * @Method get
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @Role [admin]
 */
// @ts-expect-error
router.get('/category' ,auth('admin') , getCategories)

/**
 * @Rawter
 * @Route /api/blog/category/:id
 * @Desc delete category
 * @Method delete
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @params [id]
 * @Role [admin]
 */
// @ts-expect-error
router.delete('/category/:id' ,auth('admin') , deleteCategory)

/**
 * @Rawter
 * @Route /api/blog/post
 * @Desc create post
 * @Method post
 * @Body [title,description,status,body,category]
 * @Query []
 * @Header [Authorization]
 * @params []
 * @Role [admin]
 */
// @ts-expect-error
router.post('/post' ,auth('admin') , createPost)

/**
 * @Rawter
 * @Route /api/blog/post/all-post
 * @Desc get all post for admin role
 * @Method get
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @params []
 * @Role [admin]
 */
// @ts-expect-error
router.get('/post/all-post' ,auth('admin') , getAllPosts)

/**
 * @Rawter
 * @Route /api/blog/post/
 * @Desc get published post
 * @Method get
 * @Body []
 * @Query [limit,page,sort]
 * @Header [Authorization]
 * @params []
 * @Role [admin,user]
 */
// @ts-expect-error
router.get('/post/published', getPublishedPosts)

/**
 * @Rawter
 * @Route /api/blog/post/:id
 * @Desc get single post
 * @Method get
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @params []
 * @Role [admin,user]
 */
// @ts-expect-error
router.get('/post/:id', getSinglePost)

/**
 * @Rawter
 * @Route /api/blog/post/:id
 * @Desc delete post
 * @Method delete
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @params []
 * @Role [admin]
 */
// @ts-expect-error
router.delete('/post/:id', auth('admin'),  deleteBlogPost)

/**
 * @Rawter
 * @Route /api/blog/post/:id
 * @Desc update post
 * @Method put
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @params []
 * @Role [admin]
 */
// @ts-expect-error
router.put('/post/:id', auth('admin'),  updateBlogPost)

/**
 * @Rawter
 * @Route /api/blog/post/comment/:id
 * @Desc create a comment
 * @Method post
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @params [id]
 * @Role [admin]
 */
// @ts-expect-error
router.post('/post/comment/:id', auth('user'), createComment)

/**
 * @Rawter
 * @Route /api/blog/post/comment/:id
 * @Desc change comment status
 * @Method put
 * @Body []
 * @Query []
 * @Header [Authorization]
 * @params [id]
 * @Role [admin]
 */
// @ts-expect-error
router.put('/post/comment/:postId/:commentId', auth('user'), changeBlogCommentStatus)
export {router as blog_router}