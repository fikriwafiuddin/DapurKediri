import express from "express"
import menuController from "../../controllers/menuController.js"

const menuRouter = express.Router()

menuRouter.get("/favorite", menuController.favorite)
menuRouter.get("/", menuController.getAll)

export default menuRouter
