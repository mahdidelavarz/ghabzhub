import {Router, IRouter} from "express"
import sendOTP from "../controllers/auth/send-otp.controller";
import verifyOtp from "../controllers/auth/verify.controller";
import refreshToken from "../controllers/auth/refresh.controller";
import resendOTP from "../controllers/auth/resend-otp.controller";

const router: IRouter = Router()
/**
 * @Rawter
 * @Route /api/auth/send-otp
 * @Desc send otp for target phone
 * @Method post
 * @Body [phone],
 * @Query []
 */
router.post('/send-otp' , sendOTP)

/**
 * @Rawter
 * @Route /api/auth/verify-otp
 * @Desc verify OTP
 * @Method post
 * @Body [otp],
 * @Query []
 * @Header [Authorization]
 */
router.post('/verify-otp' , verifyOtp)

/**
 * @Rawter
 * @Route /api/auth/resend-otp
 * @Desc resend OTP
 * @Method post
 * @Body [],
 * @Query []
 * @Header [token]
 * @response [otp]
 */
router.post('/resend-otp' , resendOTP)

/**
 * @Rawter
 * @Route /api/auth/refresh-token
 * @Desc Generate new access token and new refresh token
 * @Method get
 * @Body [],
 * @Query [token]
 */
router.get('/refresh-token' , refreshToken)

// @ts-ignore
export {router as auth_router}