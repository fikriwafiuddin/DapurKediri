import { fetchApi } from "@/lib/fetchers/server"
import { Menu } from "@/types"

export const getFavoriteMenu = async () =>
  await fetchApi<{ menus: Menu[] }>("/menu/favorite")
