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
import { PencilIcon } from "lucide-react"

import { useGetAllPromotions } from "@/services/hooks/promotionHook"
import { Skeleton } from "@/components/ui/skeleton"
import DeletePromotion from "./DeletePromotion"

type PromotionListProps = {
  onSelectPromotion: (promotion: Promotion) => void
}

function PromotionList({ onSelectPromotion }: PromotionListProps) {
  const { isPending, data } = useGetAllPromotions()

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
            {isPending
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={"promotions-list-" + i}>
                    <TableCell colSpan={10}>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.promotions.map((promo) => (
                  <TableRow
                    key={promo.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4 px-4 font-medium text-gray-900">
                      {promo.title}
                      <p className="text-sm text-gray-500">
                        {promo.description}
                      </p>
                    </TableCell>

                    <TableCell className="py-4 px-4">{promo.code}</TableCell>
                    <TableCell className="py-4 px-4 capitalize">
                      {promo.category === "all" ? "Semua" : promo.category}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      {promo.discountType === "percentage"
                        ? "Persentase"
                        : "Nominal"}
                    </TableCell>

                    <TableCell className="py-4 px-4 text-right">
                      {promo.discountType === "percentage"
                        ? `${promo.discountValue}%`
                        : `Rp ${Number(promo.discountValue).toLocaleString(
                            "id-ID"
                          )}`}
                    </TableCell>

                    <TableCell className="py-4 px-4 text-right">
                      {promo.maxDiscount
                        ? `Rp ${promo.maxDiscount.toLocaleString("id-ID")}`
                        : "-"}
                    </TableCell>

                    <TableCell className="py-4 px-4 text-right">
                      {promo.minOrderAmount
                        ? `Rp ${promo.minOrderAmount.toLocaleString("id-ID")}`
                        : "-"}
                    </TableCell>

                    <TableCell className="py-4 px-4 text-sm">
                      <div>
                        {new Date(promo.validFrom).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        {" - "}
                        {new Date(promo.validTo).toLocaleDateString("id-ID", {
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
                      {promo.usedCount}/{promo.usageLimit ?? "∞"}
                    </TableCell>

                    <TableCell className="py-4 px-4 text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                        onClick={() => onSelectPromotion(promo)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <DeletePromotion promotion={promo} />
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
