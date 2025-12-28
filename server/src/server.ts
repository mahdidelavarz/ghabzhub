// Internal modules
import path from "path"

// External modules
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import { connect as database } from "./config/db.config"

// environment variable
dotenv.config()
// middlewares imports
import errorMiddleware from "./middlewares/error.middleware"
import accessApi from "./middlewares/access.middleware"
// routes import
import { auth_router } from "./routes/auth.route";
import { user_router } from "./routes/user.route"
import { wallet_router } from "./routes/wallet.route"
import { carts_router } from "./routes/bill-carts.route"
import { media_router } from "./routes/photos.route"
import { blog_router } from "./routes/blog.route"
import { adminAuth_router } from "./routes/admin/auth.route"
import { createDefaultAdmin } from "./config/default.config"
import { callback_router } from "./routes/callback.route"

const app = express(),
    PORT = process.env.PORT;

// morgan
app.use(morgan("dev"))

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-secret-key']
}))

// helmet setup
app.use(helmet())

// static files
app.use(express.static(path.join(__dirname, 'public')))

// json parser
app.use(express.json())

// database connection
database()

// defaults
createDefaultAdmin()

// routes
app.use("/api/auth", accessApi, auth_router)
app.use("/api/user", accessApi, user_router)
app.use("/api/wallet", accessApi, wallet_router)
app.use("/api/bill-cart", accessApi, carts_router)
app.use("/api/media", accessApi, media_router)
app.use("/api/blog", accessApi, blog_router)
app.use("/api/admin", accessApi, adminAuth_router)
app.use("/callback" , callback_router)
// error middleware
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`🏁 Listening on ${PORT} port`)
})