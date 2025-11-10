import { fetchApi } from "@/lib/fetchers/server"
import { Order } from "@/types"

const baseEndpoint = "/orders"

export const getDetailOrder = async (orderNumber: string) =>
  await fetchApi<{ order: Order }>(`${baseEndpoint}/${orderNumber}`)
