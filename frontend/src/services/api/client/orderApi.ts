import { axiosAuthIntance, axiosIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { CartItem, FormDataOrder, Order, OrderStatus } from "@/types"

const create = async (data: FormDataOrder, items: CartItem[]) => {
  const response = await axiosIntance.post("/orders", { ...data, items })
  return unwrapResponse<{ order: Order }>(response.data)
}

const getAll = async () => {
  const response = await axiosAuthIntance.get("/admin/orders")

  return unwrapResponse<{ orders: Order[] }>(response.data)
}

const updateStatus = async (orderNumber: string, status: OrderStatus) => {
  const response = await axiosAuthIntance.patch(
    `/admin/orders/${orderNumber}`,
    { status }
  )

  return unwrapResponse(response.data)
}

const show = async (orderNumber: string) => {
  const response = await axiosAuthIntance.get(`/admin/orders/${orderNumber}`)

  return unwrapResponse<{ order: Order }>(response.data)
}

const orderApi = {
  create,
  getAll,
  updateStatus,
  show,
}
export default orderApi
