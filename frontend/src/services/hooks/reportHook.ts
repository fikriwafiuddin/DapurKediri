import { useQuery } from "@tanstack/react-query"
import reportApi from "../api/client/reportApi"

export const querKeyReportSummary = (period: string) => [
  "report-summary",
  period,
]
export const querKeyTopMenus = (period: string) => ["top-menus", period]

export const useGetReportSummary = (period: string) => {
  return useQuery({
    queryKey: querKeyReportSummary(period),
    queryFn: async () => reportApi.summary(period),
  })
}

export const useGetTopMenus = (period: string) => {
  return useQuery({
    queryKey: querKeyTopMenus(period),
    queryFn: async () => reportApi.topMenus(period),
  })
}
