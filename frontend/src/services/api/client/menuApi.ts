import { axiosAuthIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { FormDataMenuCreate, FormDataMenuUpdate, Menu } from "@/types"

const baseEndpoint = ["/admin/menu"]

const getAll = async () => {
  const response = await axiosAuthIntance.get(`${baseEndpoint}`)

  return unwrapResponse<{ menus: Menu[] }>(response.data)
}

const create = async (data: FormDataMenuCreate) => {
  const response = await axiosAuthIntance.post(`${baseEndpoint}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return unwrapResponse(response.data)
}

const edit = async (id: string, data: FormDataMenuUpdate) => {
  const response = await axiosAuthIntance.put(`${baseEndpoint}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return unwrapResponse(response.data)
}

const remove = async (id: string) => {
  const response = await axiosAuthIntance.delete(`${baseEndpoint}/${id}`)

  return unwrapResponse(response.data)
}

const menuApi = {
  getAll,
  create,
  edit,
  remove,
}
export default menuApi
