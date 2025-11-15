import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import orderApi from "../api/client/orderApi"
import {
  CartItem,
  ErrorResponse,
  FormDataOrder,
  Order,
  OrderStatus,
} from "@/types"
import { toast } from "sonner"
import { AxiosError } from "axios"

const queryKeyAllOrders = ["orders"]
const queryKeyDetailOrder = (orderNumber: string) => ["orders", orderNumber]

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

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: queryKeyAllOrders,
    queryFn: orderApi.getAll,
  })
}

export const useUpdateStatusOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { message: string },
    AxiosError<ErrorResponse>,
    { orderNumber: string; status: OrderStatus }
  >({
    mutationFn: async ({ orderNumber, status }) => {
      return await orderApi.updateStatus(orderNumber, status)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllOrders })
    },
    onError: (error) => {
      console.error("Update Status Error:", error)

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

export const useGetDetailOrder = (orderNumber: string) => {
  return useQuery({
    queryKey: queryKeyDetailOrder(orderNumber),
    queryFn: async () => orderApi.show(orderNumber),
  })
}
