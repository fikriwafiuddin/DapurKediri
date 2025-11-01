import express from "express"
import errorMiddleware from "../middlewares/errorMiddleware.js"
import adminRouter from "./admin/index.js"
import { ErrorResponse } from "../utils/response.js"

const router = express.Router()

router.use("/admin", adminRouter)

router.all(/.*/, (req, res) =>
  res.status(404).json(new ErrorResponse("Route not found", 404))
)

router.use(errorMiddleware)

export default router
