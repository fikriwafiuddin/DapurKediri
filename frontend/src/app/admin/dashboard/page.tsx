import StatCard from "@/components/StatCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
} from "lucide-react"

const recentOrders = [
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

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Ringkasan informasi restoran Anda
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pesanan Hari Ini"
          icon={ShoppingCartIcon}
          value={100}
          description="0 menunggu konfirmasi"
        />
        <StatCard
          title="Pendapatan Hari Ini"
          icon={DollarSignIcon}
          value={`Rp ${(0).toLocaleString("id-ID")}`}
        />
        <StatCard
          title="Total Pesanan"
          icon={TrendingUpIcon}
          value={0}
          description="Semua waktu"
        />
        <StatCard
          title="Item Menu"
          icon={PackageIcon}
          value={0}
          description="Menu tersedia"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
          <CardDescription>5 pesanan terakhir masuk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders?.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{order.order_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    Rp {Number(order.total_amount).toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
