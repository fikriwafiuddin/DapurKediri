import express from "express"
import orderController from "../../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/", orderController.create)
orderRouter.get("/:orderNumber", orderController.show)

export default orderRouter
