import { useMutation } from "@tanstack/react-query"
import authApi from "../api/client/authApi"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ErrorResponse } from "@/types"
import { useRouter } from "next/navigation"

export const useAuthLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/admin/dashboard")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("Login Error:", error)

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

export const useAuthLogout = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      toast.success(data.message)
      router.replace("/admin/login")
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error("Login Error:", error)

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
