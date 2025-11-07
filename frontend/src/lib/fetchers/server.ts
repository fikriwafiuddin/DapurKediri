import { ErrorResponse } from "@/types"
import { API_URL } from "../constants/application"
import { unwrapResponse } from "../responseHandler"

export const fetchApi = async <T>(endPoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endPoint}`, {
    cache: "no-cache",
  })

  if (!response.ok) {
    const error: ErrorResponse = await response.json()
    throw new Error(error.message)
  }

  return unwrapResponse(await response.json())
}
