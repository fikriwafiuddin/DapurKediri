import { z } from "zod"

const login = z.object({
  email: z.email({
    error: (issue) =>
      issue.input == undefined ? "Email wajib diisi" : "Email tidak valid",
  }),
  password: z.string({
    error: (issue) =>
      issue.input == undefined
        ? "Password wajib diisi"
        : "Password harus berupa string",
  }),
})

const adminValidation = {
  login,
}
export default adminValidation
