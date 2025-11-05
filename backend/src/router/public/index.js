import express from "express"
import orderRouter from "./orderRouter.js"
import promotionRouter from "./promotionRouter.js"

const publicRouter = express.Router()

publicRouter.use("/orders", orderRouter)
publicRouter.use("/promotions", promotionRouter)

export default publicRouter
