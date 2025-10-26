"use client"

import { Menu } from "@/types"
import { Button } from "../ui/button"
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react"
import { useState } from "react"
import useCartStore from "@/hooks/useCartStore"
import { toast } from "sonner"

type CounterMenuCardProps = {
  menu: Menu
}

function CounterMenuCard({ menu }: CounterMenuCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState<number>(0)

  const handleAddToCart = () => {
    addItem({ ...menu, quantity })
    toast.success("Berhasil masuk ke dalam keranjang")
    setQuantity(0)
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity((prev) => prev - 1)}
          disabled={quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span className="text-lg font-semibold min-w-[3ch] text-center">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Add to Cart Button */}
      <Button variant="spice" className="w-full" onClick={handleAddToCart}>
        <ShoppingCartIcon className="mr-2 h-4 w-4" />
        Tambah ke Keranjang
      </Button>
    </div>
  )
}

export default CounterMenuCard
