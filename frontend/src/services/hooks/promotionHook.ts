import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import promotionApi from "../api/client/promotionApi"
import { AxiosError } from "axios"
import { ErrorResponse, FormDataPromotionCreate } from "@/types"
import { toast } from "sonner"

export const queryKeyAllPromotions = ["promotions"]

export const useGetAllPromotions = () => {
  return useQuery({
    queryKey: queryKeyAllPromotions,
    queryFn: promotionApi.getAll,
  })
}

export const useCreatePromotion = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { message: string },
    AxiosError<ErrorResponse>,
    FormDataPromotionCreate
  >({
    mutationFn: async (data) => {
      return await promotionApi.create(data)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllPromotions })
    },
    onError: (error) => {
      console.error("Create Promotion Error:", error)

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

export const useUpdatePromotion = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { message: string },
    AxiosError<ErrorResponse>,
    { id: string; data: FormDataPromotionCreate }
  >({
    mutationFn: async ({ id, data }) => {
      return await promotionApi.update(id, data)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllPromotions })
    },
    onError: (error) => {
      console.error("Update Promotion Error:", error)

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

export const useRemovePromotion = () => {
  const queryClient = useQueryClient()

  return useMutation<{ message: string }, AxiosError<ErrorResponse>, string>({
    mutationFn: async (id) => {
      return await promotionApi.remove(id)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllPromotions })
    },
    onError: (error) => {
      console.error("Delete Promotion Error:", error)

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
