import { fetchApi } from "@/lib/fetchers/server"
import { Menu } from "@/types"

const baseEndpoint = "/menu"

export const getFavoriteMenu = async () =>
  await fetchApi<{ menus: Menu[] }>(`${baseEndpoint}/favorite`)

export const getMenus = async (category: string) =>
  await fetchApi<{ menus: Menu[] }>(`${baseEndpoint}?category=${category}`)
