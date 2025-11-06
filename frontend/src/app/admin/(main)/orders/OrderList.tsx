"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import { Order } from "@/types"
import { getStatusColor, getStatusLabel } from "@/lib/constants/orderStatus"

const orders: Order[] = [
  {
    id: "ord_001",
    order_number: "INV-20251028-001",
    customer_name: "Andi Saputra",
    phone_number: "081234567890",
    address_street: "Jl. Merpati No. 12",
    address_district: "Cilandak",
    address_city: "Jakarta Selatan",
    address_postal_code: "12430",
    address_notes: "Rumah warna hijau, pagar hitam.",
    total_amount: 250000,
    status: "pending",
    notes: "Pesan tanpa sambal.",
    created_at: new Date("2025-10-28T09:30:00Z"),
  },
  {
    id: "ord_002",
    order_number: "INV-20251028-002",
    customer_name: "Budi Santoso",
    phone_number: "082134567891",
    address_street: "Jl. Kenanga No. 8",
    address_district: "Tegalsari",
    address_city: "Surabaya",
    address_postal_code: "60262",
    address_notes: "Dekat warung Bu Siti.",
    total_amount: 175000,
    status: "confirmed",
    notes: "",
    created_at: new Date("2025-10-28T10:15:00Z"),
  },
  {
    id: "ord_003",
    order_number: "INV-20251028-003",
    customer_name: "Citra Lestari",
    phone_number: "081298765432",
    address_street: "Jl. Melati No. 45",
    address_district: "Sukajadi",
    address_city: "Bandung",
    address_postal_code: "40162",
    address_notes: "Kos putri warna biru, lantai 2.",
    total_amount: 320000,
    status: "preparing",
    notes: "Tambahkan sendok dan tisu.",
    created_at: new Date("2025-10-28T11:00:00Z"),
  },
  {
    id: "ord_004",
    order_number: "INV-20251028-004",
    customer_name: "Dewi Anggraini",
    phone_number: "087712345678",
    address_street: "Jl. Mawar No. 22",
    address_district: "Blimbing",
    address_city: "Malang",
    address_postal_code: "65126",
    address_notes: "",
    total_amount: 285000,
    status: "delivering",
    notes: "Pastikan dikirim sebelum jam 12 siang.",
    created_at: new Date("2025-10-28T11:45:00Z"),
  },
  {
    id: "ord_005",
    order_number: "INV-20251028-005",
    customer_name: "Eko Prasetyo",
    phone_number: "081377788899",
    address_street: "Jl. Sudirman No. 100",
    address_district: "Menteng",
    address_city: "Jakarta Pusat",
    address_postal_code: "10310",
    address_notes: "Kantor Bank BCA Lt. 3",
    total_amount: 540000,
    status: "completed",
    notes: "Sudah dibayar via transfer.",
    created_at: new Date("2025-10-27T14:20:00Z"),
  },
]

type OrderListProps = {
  onSelectOrder: (menu: Order) => void
}

function OrderList({ onSelectOrder }: OrderListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.order_number}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.phone_number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.address_street}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  Rp {Number(order.total_amount).toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectOrder(order)}
                    >
                      <EyeIcon />
                    </Button>
                    <Select
                      value={order.status}
                      //   onValueChange={(value: any) =>
                      //     updateStatusMutation.mutate({ orderId: order.id, status: value })
                      //   }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ubah Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Menunggu</SelectItem>
                        <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                        <SelectItem value="preparing">Diproses</SelectItem>
                        <SelectItem value="delivering">Dikirim</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default OrderList
