import { SuccessResponse } from "@/types"

export function unwrapResponse<T>(response: SuccessResponse<T>) {
  return { message: response.message, ...response.data }
}
