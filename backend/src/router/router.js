import express from "express"

const router = express.Router()

router.get("/", async (req, res) => {
  const admin = await prisma.admin.findMany()
  res.json({ message: "Dapur Kediri API is running", admin: admin })
})

export default router
