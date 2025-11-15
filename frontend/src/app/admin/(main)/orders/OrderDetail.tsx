import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetDetailOrder } from "@/services/hooks/orderHook"
import UpdateStatusOrder from "./UpdateStatusOrder"

type OrderDetailProps = {
  order: Order
  onSelectOrder: (order: Order | null) => void
}

function OrderDetail({ order, onSelectOrder }: OrderDetailProps) {
  const { isPending, data } = useGetDetailOrder(order.orderNumber)

  const handleOnSuccessUpdateStatus = () => onSelectOrder(null)

  return isPending ? (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>Detail Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-base mb-1">Informasi Umum</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">ID Pesanan:</p>
              <p>{order.id}</p>
              <p className="text-muted-foreground">Nomor Invoice:</p>
              <p>{order.orderNumber}</p>
              <p className="text-muted-foreground">Status:</p>
              <p className="capitalize">
                <UpdateStatusOrder
                  order={order}
                  handleOnSuccess={handleOnSuccessUpdateStatus}
                />
              </p>

              <p className="text-muted-foreground">Tanggal Dibuat:</p>
              <p>{new Date(order.createdAt).toLocaleString("id-ID")}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-1">Pelanggan</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">Nama:</p>
              <p>{order.customerName}</p>
              <p className="text-muted-foreground">Nomor Telepon:</p>
              <p>{order.phoneNumber}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-1">Alamat Pengiriman</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">Jalan:</p>
              <p>{order.addressStreet}</p>
              <p className="text-muted-foreground">Kecamatan:</p>
              <p>{order.addressDistrict}</p>
              <p className="text-muted-foreground">Kota:</p>
              <p>{order.addressCity}</p>
              <p className="text-muted-foreground">Kode Pos:</p>
              <p>{order.addressPostalCode}</p>
              <p className="text-muted-foreground">Catatan:</p>
              <p>{order.addressNotes || "-"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-1">
              Ringkasan Pembayaran
            </h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">Total Pembayaran:</p>
              <p>Rp {order.totalAmount.toLocaleString("id-ID")}</p>
              <p className="text-muted-foreground">Catatan:</p>
              <p>{order.notes || "-"}</p>
            </div>
          </div>

          <Separator />

          {/* ========== Order Items Table ========== */}
          <div>
            <h3 className="font-semibold text-base mb-3">Daftar Pesanan</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Nama Menu</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.order?.orderItems?.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.menuName}</TableCell>
                    <TableCell>
                      Rp {item.menuPrice.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      Rp{" "}
                      {(item.menuPrice * item.quantity).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>{item.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderDetail
