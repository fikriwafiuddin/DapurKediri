import { axiosAuthIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { Admin, FormDataLogin } from "@/types"

const baseEndpoint = "/admin/auth"

const login = async (data: FormDataLogin) => {
  const response = await axiosAuthIntance.post(`${baseEndpoint}/login`, data)

  return unwrapResponse<{ admin: Admin }>(response.data)
}

const logout = async () => {
  const response = await axiosAuthIntance.post(`${baseEndpoint}/logout`)

  return unwrapResponse(response.data)
}

const authApi = {
  login,
  logout,
}
export default authApi
