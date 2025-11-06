import express from "express"
import promotionController from "../../controllers/promotionController.js"

const promotionRouter = express.Router()

promotionRouter.get("/special", promotionController.special)
promotionRouter.get("/", promotionController.getAll)
promotionRouter.get("/:code", promotionController.show)

export default promotionRouter
