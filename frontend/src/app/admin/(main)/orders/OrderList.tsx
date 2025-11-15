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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import { Order } from "@/types"
import { getStatusColor, getStatusLabel } from "@/lib/constants/orderStatus"
import { useGetAllOrders } from "@/services/hooks/orderHook"
import { Skeleton } from "@/components/ui/skeleton"
import UpdateStatusOrder from "./UpdateStatusOrder"

type OrderListProps = {
  onSelectOrder: (menu: Order) => void
}

function OrderList({ onSelectOrder }: OrderListProps) {
  const { isPending, data } = useGetAllOrders()

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
            {isPending
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={"list-order-" + i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="w-full h-10" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.phoneNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.addressStreet}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      Rp {Number(order.totalAmount).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSelectOrder(order)}
                        >
                          <EyeIcon />
                        </Button>
                        <UpdateStatusOrder order={order} />
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
