import express from "express"
import authRouter from "./authRouter.js"
import menuRouter from "./menuRouter.js"
import orderRouter from "./orderRouter.js"

const adminRouter = express.Router()

adminRouter.use("/auth", authRouter)
adminRouter.use("/menu", menuRouter)
adminRouter.use("/orders", orderRouter)

export default adminRouter
