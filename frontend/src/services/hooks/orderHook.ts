import { useMutation } from "@tanstack/react-query"
import orderApi from "../api/client/orderApi"
import { CartItem, ErrorResponse, FormDataOrder, Order } from "@/types"
import { toast } from "sonner"
import { AxiosError } from "axios"

export const useCreateOrder = () => {
  return useMutation<
    { message: string; order: Order },
    AxiosError<ErrorResponse>,
    {
      data: FormDataOrder
      items: CartItem[]
    }
  >({
    mutationFn: async ({ data, items }) => {
      return await orderApi.create(data, items)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      console.error("Mutation Error:", error)

      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(
          error.message || "Network error. Please check your connection."
        )
      }
    },
  })
}
