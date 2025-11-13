import { axiosAuthIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { Order } from "@/types"

const baseEndpoint = "/admin/dashboard"

const summary = async () => {
  const response = await axiosAuthIntance.get(`${baseEndpoint}/summary`)

  return unwrapResponse<{
    pendingOrders: number
    todayOrders: number
    todayRevenue: number
    totalMenus: number
    totalOrders: number
  }>(response.data)
}

const latestOrders = async () => {
  const response = await axiosAuthIntance.get(`${baseEndpoint}/recentOrders`)

  return unwrapResponse<{ orders: Order[] }>(response.data)
}

const dashboardApi = {
  summary,
  latestOrders,
}
export default dashboardApi
