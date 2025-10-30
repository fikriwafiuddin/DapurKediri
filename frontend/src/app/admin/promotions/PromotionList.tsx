import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Promotion } from "@/types"
import { PencilIcon, Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const promotions: Promotion[] = [
  {
    id: "b9f7a6f8-67c2-4a8f-bb0b-94b2c4f12e9f",
    title: "Promo Akhir Pekan - Diskon 20%",
    description:
      "Nikmati diskon 20% untuk semua menu spesial setiap akhir pekan.",
    promo_code: "WEEKEND20",
    discount_type: "percentage",
    discount_value: 20.0,
    min_order_amount: 50000.0,
    max_discount_value: 20000.0,
    category: "all",
    valid_from: new Date("2025-10-25T00:00:00+07:00"),
    valid_to: new Date("2025-11-10T23:59:59+07:00"),
    usage_limit: 100,
    used_count: 45,
    active: true,
    created_at: new Date("2025-10-25T10:00:00+07:00"),
    updated_at: new Date("2025-10-25T10:00:00+07:00"),
  },
  {
    id: "ed25c3ab-2b79-4d58-a5a1-1e49d1c4babc",
    title: "Promo Makan Siang Hemat",
    description:
      "Potongan Rp10.000 untuk setiap pembelian paket makan siang di atas Rp50.000.",
    promo_code: "LUNCH10K",
    discount_type: "fixed_amount",
    discount_value: 10000.0,
    min_order_amount: 50000.0,
    max_discount_value: null,
    category: "food",
    valid_from: new Date("2025-10-20T10:00:00+07:00"),
    valid_to: new Date("2025-11-05T22:00:00+07:00"),
    usage_limit: 50,
    used_count: 10,
    active: true,
    created_at: new Date("2025-10-20T09:00:00+07:00"),
    updated_at: new Date("2025-10-20T09:00:00+07:00"),
  },
]

type PromotionListProps = {
  onSelectPromotion: (promotion: Promotion) => void
}

function PromotionList({ onSelectPromotion }: PromotionListProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Daftar Promo</h2>

      <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-3 px-4">Judul</TableHead>
              <TableHead className="py-3 px-4">Kode</TableHead>
              <TableHead className="py-3 px-4">Kategori</TableHead>
              <TableHead className="py-3 px-4">Tipe</TableHead>
              <TableHead className="py-3 px-4 text-right">Nilai</TableHead>
              <TableHead className="py-3 px-4 text-right">
                Maks. Diskon
              </TableHead>
              <TableHead className="py-3 px-4 text-right">Min. Order</TableHead>
              <TableHead className="py-3 px-4">Periode</TableHead>
              <TableHead className="py-3 px-4 text-center">Status</TableHead>
              <TableHead className="py-3 px-4 text-center">Digunakan</TableHead>
              <TableHead className="py-3 px-4 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {promotions.map((promo) => (
              <TableRow
                key={promo.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="py-4 px-4 font-medium text-gray-900">
                  {promo.title}
                  <p className="text-sm text-gray-500">{promo.description}</p>
                </TableCell>

                <TableCell className="py-4 px-4">{promo.promo_code}</TableCell>
                <TableCell className="py-4 px-4 capitalize">
                  {promo.category === "all" ? "Semua" : promo.category}
                </TableCell>
                <TableCell className="py-4 px-4">
                  {promo.discount_type === "percentage"
                    ? "Persentase"
                    : "Nominal"}
                </TableCell>

                <TableCell className="py-4 px-4 text-right">
                  {promo.discount_type === "percentage"
                    ? `${promo.discount_value}%`
                    : `Rp ${Number(promo.discount_value).toLocaleString(
                        "id-ID"
                      )}`}
                </TableCell>

                <TableCell className="py-4 px-4 text-right">
                  {promo.max_discount_value
                    ? `Rp ${promo.max_discount_value.toLocaleString("id-ID")}`
                    : "-"}
                </TableCell>

                <TableCell className="py-4 px-4 text-right">
                  {promo.min_order_amount
                    ? `Rp ${promo.min_order_amount.toLocaleString("id-ID")}`
                    : "-"}
                </TableCell>

                <TableCell className="py-4 px-4 text-sm">
                  <div>
                    {new Date(promo.valid_from).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    {" - "}
                    {new Date(promo.valid_to).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </TableCell>

                <TableCell className="py-4 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      promo.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {promo.active ? "Aktif" : "Nonaktif"}
                  </span>
                </TableCell>

                <TableCell className="py-4 px-4 text-center text-sm">
                  {promo.used_count}/{promo.usage_limit ?? "∞"}
                </TableCell>

                <TableCell className="py-4 px-4 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                    onClick={() => onSelectPromotion(promo)}
                    // onClick={() => handleEdit(promo)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Promo &quot;{promo.title}&quot; akan dihapus secara
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button variant="destructive">Hapus</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PromotionList
