import prisma from "../database/prisma.js"
import adminValidation from "../validations/adminValidation.js"
import validation from "../validations/validation.js"
import { ErrorResponse } from "../utils/response.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js"

const login = async (request) => {
  const { email, password } = validation(adminValidation.login, request)

  const admin = await prisma.admin.findUnique({
    where: { email },
  })
  if (!admin) {
    throw new ErrorResponse("Email atau password salah", 400, {
      email: ["Email atau password salah"],
      password: ["Email atau password salah"],
    })
  }

  const comparePassword = bcrypt.compareSync(password, admin.password)
  if (!comparePassword) {
    throw new ErrorResponse("Email atau password salah", 400, {
      email: ["Email atau password salah"],
      password: ["Email atau password salah"],
    })
  }

  const token = generateToken({ id: admin.id, email: admin.email })

  return {
    admin: {
      id: admin.id,
      email: admin.email,
    },
    token,
  }
}

const session = async (adminId) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      email: true,
      username: true,
    },
  })
  return admin
}

const adminService = {
  login,
  session,
}
export default adminService
