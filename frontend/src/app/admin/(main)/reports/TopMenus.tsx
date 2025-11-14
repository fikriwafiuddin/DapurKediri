import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetTopMenus } from "@/services/hooks/reportHook"

type TopMenusProps = {
  period: string
}

function TopMenus({ period }: TopMenusProps) {
  const { isPending, data } = useGetTopMenus(period)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Terlaris</CardTitle>
        <CardDescription>Berdasarkan jumlah pesanan</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Menu</TableHead>
              <TableHead className="text-right">Terjual</TableHead>
              <TableHead className="text-right">Pendapatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={"lates-order" + i}>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.menus?.map((item) => (
                  <TableRow key={item.menuId}>
                    <TableCell className="font-medium">
                      {item.menuName}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.totalQuantity}
                    </TableCell>
                    <TableCell className="text-right">
                      Rp {item.revenue.toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TopMenus
