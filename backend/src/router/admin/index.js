import express from "express"
import authRouter from "./authRouter.js"
import menuRouter from "./menuRouter.js"

const adminRouter = express.Router()

adminRouter.use("/auth", authRouter)
adminRouter.use("/menu", menuRouter)

export default adminRouter
