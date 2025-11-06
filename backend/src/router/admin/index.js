import express from "express"
import authRouter from "./authRouter.js"
import menuRouter from "./menuRouter.js"
import orderRouter from "./orderRouter.js"
import promotionRouter from "./promotionRouter.js"
import dashboardRouter from "./dashboardRouter.js"
import reportRouter from "./reportRouter.js"

const adminRouter = express.Router()

adminRouter.use("/auth", authRouter)
adminRouter.use("/menu", menuRouter)
adminRouter.use("/orders", orderRouter)
adminRouter.use("/promotions", promotionRouter)
adminRouter.use("/dashboard", dashboardRouter)
adminRouter.use("/reports", reportRouter)

export default adminRouter
