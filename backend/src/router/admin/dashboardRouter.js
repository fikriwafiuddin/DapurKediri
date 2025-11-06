import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import dashboardController from "../../controllers/dashboardController.js"

const dashboardRouter = express.Router()

dashboardRouter.get("/summary", authMiddleware, dashboardController.summary)
dashboardRouter.get(
  "/recentOrders",
  authMiddleware,
  dashboardController.recentOrders
)

export default dashboardRouter
