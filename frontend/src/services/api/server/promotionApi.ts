import { fetchApi } from "@/lib/fetchers/server"
import { Promotion } from "@/types"

const baseEndpoint = "/promotions"

export const getSpecialPromotion = async () =>
  await fetchApi<{ promotions: Promotion[] }>(`${baseEndpoint}/special`)

export const getPromotions = async () =>
  await fetchApi<{ promotions: Promotion[] }>(`${baseEndpoint}`)
