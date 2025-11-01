import express from "express"
import adminController from "../../controllers/adminController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"

const authRouter = express.Router()

authRouter.post("/login", adminController.login)
authRouter.post("/logout", authMiddleware, adminController.logout)
authRouter.get("/session", authMiddleware, adminController.session)

export default authRouter
