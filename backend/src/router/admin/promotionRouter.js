import express from "express"
import promotionController from "../../controllers/promotionController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"

const promotionRouter = express.Router()

promotionRouter.post("/", authMiddleware, promotionController.create)
promotionRouter.put("/:id", authMiddleware, promotionController.update)
promotionRouter.delete("/:id", authMiddleware, promotionController.remove)
promotionRouter.get("/", authMiddleware, promotionController.getAll)
promotionRouter.get("/:code", authMiddleware, promotionController.show)

export default promotionRouter
