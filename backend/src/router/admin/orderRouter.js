import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import orderController from "../../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.get("/", authMiddleware, orderController.getAll)
orderRouter.get("/:orderNumber", authMiddleware, orderController.show)
orderRouter.patch("/:orderNumber", authMiddleware, orderController.updateStatus)

export default orderRouter
