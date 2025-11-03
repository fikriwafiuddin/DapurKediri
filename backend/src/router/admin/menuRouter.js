import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import uploadFile from "../../middlewares/uploadFile.js"
import menuController from "../../controllers/menuController.js"

const menuRouter = express.Router()

menuRouter.post("/", authMiddleware, uploadFile, menuController.create)
menuRouter.put("/:id", authMiddleware, uploadFile, menuController.update)
menuRouter.delete("/:id", authMiddleware, menuController.remove)
menuRouter.get("/", authMiddleware, menuController.getAll)

export default menuRouter
