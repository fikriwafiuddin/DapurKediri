import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllMenus } from "@/services/hooks/menuHook"
import { Menu } from "@/types"
import { PencilIcon } from "lucide-react"
import DeleteMenu from "./DeleteMenu"

type MenuListProps = {
  onSelectMenu: (menu: Menu | null) => void
}

function MenuList({ onSelectMenu }: MenuListProps) {
  const { isPending, data } = useGetAllMenus()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Harga</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? [...Array(5)].map((_, i) => (
              <TableRow key={"list-menu " + i}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ))
          : data?.menus.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.available ? "Tersedia" : "Habis"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectMenu(item)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <DeleteMenu menu={item} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}

export default MenuList
