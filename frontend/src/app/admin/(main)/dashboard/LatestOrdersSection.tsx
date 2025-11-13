import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { useGetLatestOrders } from "@/services/hooks/dashboardHook"

function LatestOrdersSection() {
  const { isPending, data } = useGetLatestOrders()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesanan Terbaru</CardTitle>
        <CardDescription>
          {isPending ? (
            <Spinner className="inline" />
          ) : (
            data?.orders?.length || 0
          )}{" "}
          pesanan terakhir masuk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isPending
            ? [...Array(5)].map((_, i) => (
                <div key={"lates-order" + i} className="w-full border-b pb-2">
                  <Skeleton className="w-full h-10" />
                </div>
              ))
            : data?.orders?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      Rp {Number(order.totalAmount).toLocaleString("id-ID")}
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
  )
}

export default LatestOrdersSection
