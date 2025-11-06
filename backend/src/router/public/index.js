import express from "express"
import orderRouter from "./orderRouter.js"
import promotionRouter from "./promotionRouter.js"
import menuRouter from "./menuRouter.js"

const publicRouter = express.Router()

publicRouter.use("/menu", menuRouter)
publicRouter.use("/orders", orderRouter)
publicRouter.use("/promotions", promotionRouter)

export default publicRouter
