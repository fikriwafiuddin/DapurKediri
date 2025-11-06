import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const orderItems = [
  {
    id: "itm_001",
    order_id: "ord_005",
    menu_item_id: "mn_001",
    menu_item_name: "Nasi Pecel Spesial",
    menu_item_price: 15000,
    quantity: 2,
    notes: "Tanpa kerupuk",
    created_at: new Date("2025-10-27T14:25:00Z"),
  },
  {
    id: "itm_002",
    order_id: "ord_005",
    menu_item_id: "mn_002",
    menu_item_name: "Tempe Goreng",
    menu_item_price: 5000,
    quantity: 4,
    notes: "",
    created_at: new Date("2025-10-27T14:25:30Z"),
  },
  {
    id: "itm_003",
    order_id: "ord_005",
    menu_item_id: "mn_003",
    menu_item_name: "Es Teh Manis",
    menu_item_price: 8000,
    quantity: 2,
    notes: "Tidak terlalu manis",
    created_at: new Date("2025-10-27T14:26:00Z"),
  },
  {
    id: "itm_004",
    order_id: "ord_005",
    menu_item_id: "mn_004",
    menu_item_name: "Bakwan Jagung",
    menu_item_price: 4000,
    quantity: 3,
    notes: "",
    created_at: new Date("2025-10-27T14:26:30Z"),
  },
]

type OrderDetailProps = {
  order: Order
}

function OrderDetail({ order }: OrderDetailProps) {
  return (
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
              <p>{order.order_number}</p>
              <p className="text-muted-foreground">Status:</p>
              <p className="capitalize">
                <Select value={order.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </p>

              <p className="text-muted-foreground">Tanggal Dibuat:</p>
              <p>{new Date(order.created_at).toLocaleString("id-ID")}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-1">Pelanggan</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">Nama:</p>
              <p>{order.customer_name}</p>
              <p className="text-muted-foreground">Nomor Telepon:</p>
              <p>{order.phone_number}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-1">Alamat Pengiriman</h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">Jalan:</p>
              <p>{order.address_street}</p>
              <p className="text-muted-foreground">Kecamatan:</p>
              <p>{order.address_district}</p>
              <p className="text-muted-foreground">Kota:</p>
              <p>{order.address_city}</p>
              <p className="text-muted-foreground">Kode Pos:</p>
              <p>{order.address_postal_code}</p>
              <p className="text-muted-foreground">Catatan:</p>
              <p>{order.address_notes || "-"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-1">
              Ringkasan Pembayaran
            </h3>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="text-muted-foreground">Total Pembayaran:</p>
              <p>Rp {order.total_amount.toLocaleString("id-ID")}</p>
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
                {orderItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.menu_item_name}</TableCell>
                    <TableCell>
                      Rp {item.menu_item_price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      Rp{" "}
                      {(item.menu_item_price * item.quantity).toLocaleString(
                        "id-ID"
                      )}
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
