import express from "express"
import cors from "cors"
import "dotenv/config"

const app = express()
const port = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log("Server is running on http://localhost:${PORT}")
})
