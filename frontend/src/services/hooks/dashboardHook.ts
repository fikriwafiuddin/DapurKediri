import { useQuery } from "@tanstack/react-query"
import dashboardApi from "../api/client/dashboardApi"

export const queryKeyDashboardSummary = ["dashboard-summary"]
export const queryKeyLatestOrders = ["latest-orders"]

export const useGetDashboardSummary = () => {
  return useQuery({
    queryKey: queryKeyDashboardSummary,
    queryFn: dashboardApi.summary,
  })
}

export const useGetLatestOrders = () => {
  return useQuery({
    queryKey: queryKeyLatestOrders,
    queryFn: dashboardApi.latestOrders,
  })
}
