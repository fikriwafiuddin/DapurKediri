"use client"

import useCartStore from "@/hooks/useCartStore"
import useHydratedStore from "@/hooks/useHydratedStore"
import EmptyCart from "./EmptyCart"
import FormCheckout from "./FormCheckout"

function CheckoutPage() {
  const items = useHydratedStore(useCartStore, (state) => state.items)

  if (items?.length === 0) {
    return <EmptyCart />
  }
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">
              Lengkapi data Anda untuk menyelesaikan pesanan
            </p>
          </div>

          <FormCheckout />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
