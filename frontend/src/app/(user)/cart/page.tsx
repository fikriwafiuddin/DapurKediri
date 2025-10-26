"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useCartStore from "@/hooks/useCartStore"
import useHydratedStore from "@/hooks/useHydratedStore"
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function CartPage() {
  const items = useHydratedStore(useCartStore, (state) => state.items) || []
  const totalPrice = useHydratedStore(useCartStore, (state) =>
    state.getTotalPrice()
  )
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const updateNotes = useCartStore((state) => state.updateNotes)
  const [globalNotes, setGlobalNotes] = useState("")

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBagIcon className="h-24 w-24 text-muted-foreground mx-auto mb-8" />
            <h1 className="text-3xl font-bold mb-4">Keranjang Kosong</h1>
            <p className="text-muted-foreground mb-8">
              Belum ada item di keranjang Anda. Mari mulai berbelanja!
            </p>
            <Link href="/menu">
              <Button variant="hero" size="lg">
                Lihat Menu
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Keranjang Belanja</h1>
            <p className="text-muted-foreground">
              {items.length} item dalam keranjang Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.menu.id} className="shadow-warm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div
                        className="w-24 h-24 bg-cover bg-center rounded-lg shrink-0"
                        style={{ backgroundImage: `url(${item.menu.image})` }}
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.menu.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {item.menu.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.menu.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.menu.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold min-w-[3ch] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.menu.id, item.quantity + 1)
                              }
                            >
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              Rp {item.menu.price.toLocaleString("id-ID")} x{" "}
                              {item.quantity}
                            </div>
                            <div className="font-bold text-lg text-primary">
                              Rp{" "}
                              {(item.menu.price * item.quantity).toLocaleString(
                                "id-ID"
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Item Notes */}
                        <div className="mt-4">
                          <Label
                            htmlFor={`notes-${item.menu.id}`}
                            className="text-sm"
                          >
                            Catatan untuk item ini:
                          </Label>
                          <Textarea
                            id={`notes-${item.menu.id}`}
                            placeholder="Contoh: jangan terlalu pedas, sambal dipisah"
                            value={item.notes || ""}
                            onChange={(e) =>
                              updateNotes(item.menu.id, e.target.value)
                            }
                            className="mt-1"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Global Notes */}
              <Card className="shadow-warm">
                <CardHeader>
                  <CardTitle className="text-lg">Catatan Tambahan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Catatan untuk seluruh pesanan (opsional)"
                    value={globalNotes}
                    onChange={(e) => setGlobalNotes(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle>Ringkasan Pesanan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.menu.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.menu.name} x{item.quantity}
                          </span>
                          <span>
                            Rp{" "}
                            {(item.menu.price * item.quantity).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          Rp {(totalPrice || 0).toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <Link href="/checkout" className="block">
                          <Button variant="hero" size="lg" className="w-full">
                            Lanjutkan ke Pembayaran
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>

                        <Link href="/menu" className="block">
                          <Button variant="outline" className="w-full">
                            Tambah Menu Lain
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          onClick={clearCart}
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          Kosongkan Keranjang
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                      <p>💳 Pembayaran: Cash on Delivery (COD)</p>
                      <p>🚚 Estimasi pengiriman: 30-45 menit</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
