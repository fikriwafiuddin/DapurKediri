import { SuccessResponse } from "@/types"

export function unwrapResponse<T>(response: SuccessResponse<T>) {
  return response.data
}
