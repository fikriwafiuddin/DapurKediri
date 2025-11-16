"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import orderValidation from "@/lib/validations/orderValidation"
import { ErrorResponse, FormDataOrder, Promotion } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircleIcon,
  CreditCardIcon,
  MapPinIcon,
  UserIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useHydratedStore from "@/hooks/useHydratedStore"
import useCartStore from "@/hooks/useCartStore"
import { useRouter } from "next/navigation"
import { useCreateOrder } from "@/services/hooks/orderHook"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { useState } from "react"
import { axiosIntance } from "@/lib/fetchers/client"
import { unwrapResponse } from "@/lib/responseHandler"
import { AxiosError } from "axios"

function FormCheckout() {
  const form = useForm({
    resolver: zodResolver(orderValidation.create),
    defaultValues: {
      customerName: "",
      phoneNumber: "",
      address: {
        street: "",
        district: "",
        city: "Kediri",
        postalCode: "",
        notes: "",
      },
      notes: "",
    },
  })
  const router = useRouter()
  const { isPending, mutate } = useCreateOrder()
  const [codePromo, setCodePromo] = useState<string>("")
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  )
  const [isLoadingSearchPromo, setIsLoadingSearchPromo] =
    useState<boolean>(false)

  const items = useHydratedStore(useCartStore, (state) => state.items) || []
  const totalAmout =
    useHydratedStore(useCartStore, (state) => state.getTotalPrice()) || 0
  const clearCart = useCartStore((state) => state.clearCart)

  const onSubmit = (data: FormDataOrder) => {
    if (items.length == 0) {
      return toast.error("Keranjang masih kosong")
    }

    mutate(
      {
        data,
        items: items.map((item) => ({
          id: item.menu.id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (data) => {
          clearCart()
          router.push(`/confirmation/${data.order.orderNumber}`)
        },
      }
    )
  }

  const handleSearchPromo = async () => {
    setIsLoadingSearchPromo(true)
    try {
      const response = await axiosIntance.get(`/promotions/${codePromo}`)

      const data = unwrapResponse<{ promotion: Promotion }>(response.data)
      toast.success(data.message)
      setSelectedPromotion(data.promotion)
      form.setValue("promotionId", data.promotion.id.toString())
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error as AxiosError<ErrorResponse>
        toast.error(
          errorMessage?.response?.data.message || errorMessage.message
        )
      } else {
        toast.error("Ada kesalahan")
      }
      console.log("Search Promo Error", error)
    } finally {
      setIsLoadingSearchPromo(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Customer Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukkan nama lengkap Anda"
                        className="mt-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor HP *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contoh: 081234567890"
                        className="mt-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pastikan nomor aktif untuk konfirmasi pesanan
              </p>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Jalan, nomor rumah, RT/RW"
                        className="mt-1"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Contoh: Mojoroto"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota *</FormLabel>
                      <FormControl>
                        <Input {...field} className="mt-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Pos</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, "")
                          field.onChange(onlyNums)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patokan/Catatan Alamat</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Contoh: Dekat warung Bu Siti, rumah cat hijau"
                        className="mt-1"
                        rows={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle>Catatan Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Catatan tambahan untuk pesanan Anda (opsional)"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Items Summary */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`chekout-${item.menu.id}`}
                      className="flex justify-between"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.menu.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}x @ Rp{" "}
                          {item.menu.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="font-medium">
                        Rp{" "}
                        {(item.menu.price * item.quantity).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  {selectedPromotion && (
                    <div className="flex justify-between items-center font-medium">
                      <span>Diskon</span>
                      <span className="text-primary">
                        Rp{" "}
                        {selectedPromotion.discountValue.toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      Rp {totalAmout.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCardIcon className="h-5 w-5" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 border border-primary rounded-lg bg-primary/5">
                  <CheckCircleIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Cash on Delivery (COD)</p>
                    <p className="text-sm text-muted-foreground">
                      Bayar tunai saat pesanan tiba
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Promo */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-center">Kode Promo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  type="text"
                  placeholder="Masukkan kode promo"
                  className="text-center"
                  value={codePromo}
                  onChange={(e) => setCodePromo(e.target.value.toUpperCase())}
                />
                <Button
                  className="w-full"
                  disabled={!codePromo || isLoadingSearchPromo}
                  type="button"
                  onClick={handleSearchPromo}
                >
                  {isLoadingSearchPromo ? <Spinner /> : "Cari Promo"}
                </Button>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Konfirmasi Pesanan"}
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              <p>🚚 Estimasi pengiriman: 30-45 menit</p>
              <p>📞 Kami akan menghubungi Anda untuk konfirmasi</p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default FormCheckout
