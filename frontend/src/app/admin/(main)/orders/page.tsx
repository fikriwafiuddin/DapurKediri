"use client"

import { useState } from "react"
import OrderList from "./OrderList"
import { Order } from "@/types"
import OrderDetail from "./OrderDetail"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Pesanan</h2>
          <p className="text-muted-foreground">
            Pantau dan update status pesanan
          </p>
        </div>
        {selectedOrder && (
          <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Kembali ke Daftar Pesanan
          </Button>
        )}
      </div>

      {selectedOrder ? (
        <OrderDetail order={selectedOrder} onSelectOrder={setSelectedOrder} />
      ) : (
        <OrderList onSelectOrder={setSelectedOrder} />
      )}
    </div>
  )
}

export default OrdersPage
