import { Menu } from "@/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface CartItem extends Menu {
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (menu: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  getQuantity: (id: string) => number
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          )

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += newItem.quantity
            return { items: updatedItems }
          } else {
            return { items: [...state.items, newItem] }
          }
        })
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          ),
        }))
      },
      getQuantity: (id) => {
        const menuIsExist = get().items.find((item) => item.id == id)
        if (menuIsExist) {
          return menuIsExist.quantity
        }
        return 0
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
export default useCartStore
