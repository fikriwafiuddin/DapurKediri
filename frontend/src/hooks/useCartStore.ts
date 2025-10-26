import { Menu } from "@/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface CartItem {
  menu: Menu
  quantity: number
  notes?: string
}

type CartState = {
  items: CartItem[]
  addItem: (menu: Menu, quantity: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  getQuantity: (id: string) => number
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  updateNotes: (notes: string, id: string) => void
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (menu, quantity) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.menu.id === menu.id
          )

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += quantity
            return { items: updatedItems }
          } else {
            return { items: [...state.items, { menu, quantity }] }
          }
        })
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.menu.id !== id),
        }))
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.menu.id === id ? { ...item, quantity: quantity } : item
          ),
        }))
      },
      getQuantity: (id) => {
        const menuIsExist = get().items.find((item) => item.menu.id == id)
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
          (total, item) => total + item.menu.price * item.quantity,
          0
        ),
      updateNotes: (notes, id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.menu.id === id ? { ...item, notes } : item
          ),
        }))
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
export default useCartStore
