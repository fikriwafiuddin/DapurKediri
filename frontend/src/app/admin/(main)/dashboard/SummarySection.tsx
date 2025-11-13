import StatCard from "@/components/StatCard"
import StatCardSkeleton from "@/components/StatCardSkeleton"
import { useGetDashboardSummary } from "@/services/hooks/dashboardHook"
import {
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
} from "lucide-react"

function SummarySection() {
  const { data, isPending } = useGetDashboardSummary()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isPending ? (
        [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
      ) : (
        <>
          <StatCard
            title="Pesanan Hari Ini"
            icon={ShoppingCartIcon}
            value={data?.todayRevenue || 0}
            description={`${data?.pendingOrders || 0} menunggu konfirmasi`}
          />
          <StatCard
            title="Pendapatan Hari Ini"
            icon={DollarSignIcon}
            value={`Rp ${(data?.todayRevenue || 0).toLocaleString("id-ID")}`}
          />
          <StatCard
            title="Total Pesanan"
            icon={TrendingUpIcon}
            value={data?.totalOrders || 0}
            description="Semua waktu"
          />
          <StatCard
            title="Item Menu"
            icon={PackageIcon}
            value={data?.totalMenus || 0}
            description="Menu tersedia"
          />
        </>
      )}
    </div>
  )
}

export default SummarySection
