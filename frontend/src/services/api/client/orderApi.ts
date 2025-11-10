import { axiosIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { CartItem, FormDataOrder, Order } from "@/types"

const create = async (data: FormDataOrder, items: CartItem[]) => {
  const response = await axiosIntance.post("/orders", { ...data, items })
  return unwrapResponse<{ order: Order }>(response.data)
}

const orderApi = {
  create,
}
export default orderApi
