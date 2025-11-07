import { fetchApi } from "@/lib/fetchers/server"
import { Promotion } from "@/types"

export const getSpecialPromotion = async () =>
  await fetchApi<{ promotions: Promotion[] }>("/promotions/special")
