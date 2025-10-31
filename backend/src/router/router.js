import express from "express"
import bcrypt from "bcrypt"
import prisma from "../database/prisma.js"
import errorMiddleware from "../middlewares/errorMiddleware.js"

const router = express.Router()

router.get("/", (req, res, next) => {
  next("error")
  res.json({ message: "Welcome to the API" })
})

router.use(errorMiddleware)

export default router
