"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import TopMenus from "./TopMenus"
import Stats from "./Stats"

function ReportsPage() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Laporan</h2>
          <p className="text-muted-foreground">
            Analisis penjualan dan performa menu
          </p>
        </div>
        <Select
          value={period}
          onValueChange={(value) =>
            setPeriod(value as "today" | "week" | "month")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hari Ini</SelectItem>
            <SelectItem value="week">7 Hari Terakhir</SelectItem>
            <SelectItem value="month">30 Hari Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Stats period={period} />

      <TopMenus period={period} />
    </div>
  )
}

export default ReportsPage
