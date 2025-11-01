import { verifyToken } from "../utils/jwt.js"
import { ErrorResponse } from "../utils/response.js"

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json(new ErrorResponse("Unauthorized", 401))
  }
  try {
    const decoded = verifyToken(token)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json(new ErrorResponse("Unauthorized", 401))
  }
}
export default authMiddleware
