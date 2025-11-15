import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import menuApi from "../api/client/menuApi"
import { AxiosError } from "axios"
import { ErrorResponse, FormDataMenuCreate, FormDataMenuUpdate } from "@/types"
import { toast } from "sonner"

const queryKeyAllMenus = ["menus"]

export const useGetAllMenus = () => {
  return useQuery({
    queryKey: queryKeyAllMenus,
    queryFn: menuApi.getAll,
  })
}

export const useCreateMenu = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { message: string },
    AxiosError<ErrorResponse>,
    FormDataMenuCreate
  >({
    mutationFn: async (data) => {
      return menuApi.create(data)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllMenus })
    },
    onError: (error) => {
      console.error("Create Menu Error:", error)

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

export const useEditMenu = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { message: string },
    AxiosError<ErrorResponse>,
    { id: string; data: FormDataMenuUpdate }
  >({
    mutationFn: async ({ id, data }) => {
      return menuApi.edit(id, data)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllMenus })
    },
    onError: (error) => {
      console.error("Update Menu Error:", error)

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

export const useDeleteMenu = () => {
  const queryClient = useQueryClient()

  return useMutation<{ message: string }, AxiosError<ErrorResponse>, string>({
    mutationFn: async (id) => {
      return menuApi.remove(id)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: queryKeyAllMenus })
    },
    onError: (error) => {
      console.error("Delete Menu Error:", error)

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
