import { axiosAuthIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"

const baseEndpoint = "/admin/reports"

const summary = async (period: string) => {
  const response = await axiosAuthIntance.get(`${baseEndpoint}/summary`, {
    params: { period },
  })

  return unwrapResponse<{
    totalRevenue: number
    totalOrders: number
    averageOrderValue: number
  }>(response.data)
}

const topMenus = async (period: string) => {
  const response = await axiosAuthIntance.get(`${baseEndpoint}/topMenus`, {
    params: { period },
  })

  return unwrapResponse<{
    menus: {
      menuId: number
      menuName: number
      totalQuantity: number
      revenue: number
    }[]
  }>(response.data)
}

const reportApi = {
  summary,
  topMenus,
}
export default reportApi
