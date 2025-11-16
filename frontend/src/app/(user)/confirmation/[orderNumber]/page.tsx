import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDetailOrder } from "@/services/api/server/orderApi"
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react"
import Link from "next/link"

async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>
}) {
  const { orderNumber } = await params
  const { order } = await getDetailOrder(orderNumber)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-success">
              Pesanan Berhasil!
            </h1>
            <p className="text-muted-foreground">
              Terima kasih telah mempercayai Rasa Kediri
            </p>
          </div>

          {/* Order Details */}
          <Card className="shadow-elegant mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Detail Pesanan</span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {order.orderNumber}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Nama Pemesan
                    </p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nomor HP</p>
                    <p className="font-medium">{order.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <MapPinIcon className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Alamat Pengiriman
                  </p>
                  <p className="font-medium">{order.addressStreet}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.addressDistrict}, {order.addressCity}
                  </p>
                  {order.addressNotes && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Catatan: {order.addressNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Item Pesanan</h3>
                <div className="space-y-2">
                  {order.orderItems?.map((item) => (
                    <div
                      key={`confirmation-${item.id}`}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.menuName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x @ Rp{" "}
                          {item.menuPrice.toLocaleString("id-ID")}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground italic">
                            Catatan: {item.notes}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold">
                        Rp{" "}
                        {(item.menuPrice * item.quantity).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 mt-3">
                  {order?.discountValue && (
                    <div className="flex justify-between items-center font-semibold">
                      <span>Diskon</span>
                      <span className="text-primary">
                        Rp {order.discountValue.toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Pembayaran</span>
                    <span className="text-primary">
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {order?.notes && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Catatan Pesanan
                  </p>
                  <p className="font-medium">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Langkah Selanjutnya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Konfirmasi Tim Kami</p>
                    <p className="text-sm text-muted-foreground">
                      Tim Rasa Kediri akan menghubungi Anda dalam 5-10 menit
                      untuk konfirmasi pesanan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Persiapan Pesanan</p>
                    <p className="text-sm text-muted-foreground">
                      Makanan Anda akan dipersiapkan dengan fresh ingredients
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Pengiriman</p>
                    <p className="text-sm text-muted-foreground">
                      Pesanan akan diantar ke alamat Anda dalam 30-45 menit
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-warm p-4 rounded-lg mt-6">
                <p className="text-center font-medium">
                  💳 Pembayaran: Cash on Delivery (COD)
                </p>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  Siapkan uang pas sebesar{" "}
                  <span className="font-semibold">
                    Rp {order.totalAmount.toLocaleString("id-ID")}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/menu" className="flex-1">
              <Button variant="hero" className="w-full">
                Pesan Lagi
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-8 p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Ada pertanyaan atau butuh bantuan?
            </p>
            <p className="font-medium">
              Hubungi kami:{" "}
              <span className="text-primary">(0354) 123-4567</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage
