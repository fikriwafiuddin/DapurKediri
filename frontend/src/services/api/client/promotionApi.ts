import { axiosAuthIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { FormDataPromotionCreate, Promotion } from "@/types"

const baseEndPoint = "/admin/promotions"

const getAll = async () => {
  const response = await axiosAuthIntance.get(baseEndPoint)

  return unwrapResponse<{ promotions: Promotion[] }>(response.data)
}

const create = async (data: FormDataPromotionCreate) => {
  const response = await axiosAuthIntance.post(baseEndPoint, data)

  return unwrapResponse(response.data)
}

const update = async (id: string, data: FormDataPromotionCreate) => {
  const response = await axiosAuthIntance.put(`${baseEndPoint}/${id}`, data)

  return unwrapResponse(response.data)
}

const remove = async (id: string) => {
  const response = await axiosAuthIntance.delete(`${baseEndPoint}/${id}`)

  return unwrapResponse(response.data)
}

const promotionApi = {
  getAll,
  create,
  update,
  remove,
}
export default promotionApi
