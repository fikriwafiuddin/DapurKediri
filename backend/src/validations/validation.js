import { ZodError, z } from "zod"
import { ErrorResponse } from "../utils/response.js"

const validation = (schema, request = {}) => {
  try {
    const result = schema.parse(request)
    return result
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = z.flattenError(error)
      throw new ErrorResponse("Validation error", 400, errors.fieldErrors)
    }
  }
}
export default validation
