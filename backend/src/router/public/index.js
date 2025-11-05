import express from "express"
import orderRouter from "./orderRouter.js"

const publicRouter = express.Router()

publicRouter.use("/orders", orderRouter)

export default publicRouter
