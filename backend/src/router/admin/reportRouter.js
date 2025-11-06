import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import reportController from "../../controllers/reportController.js"

const reportRouter = express.Router()

reportRouter.get("/summary", authMiddleware, reportController.summary)
reportRouter.get("/topMenus", authMiddleware, reportController.topMenus)

export default reportRouter
