import prisma from "../database/prisma.js"
import adminService from "../services/adminService.js"
import { SuccessResponse } from "../utils/response.js"

const login = async (req, res, next) => {
  try {
    const request = req.body

    const { admin, token } = await adminService.login(request)

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        secure: true,
        domain: process.env.COOKIE_DOMAIN,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(
        new SuccessResponse("Login berhasil", {
          admin,
        })
      )
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token")
    return res.status(200).json(new SuccessResponse("Logout berhasil"))
  } catch (error) {
    next(error)
  }
}

const session = async (req, res, next) => {
  try {
    const adminId = req.user.id
    const admin = await adminService.session(adminId)
    return res.status(200).json(new SuccessResponse("Session aktif", { admin }))
  } catch (error) {
    next(error)
  }
}

const adminController = {
  login,
  logout,
  session,
}
export default adminController
