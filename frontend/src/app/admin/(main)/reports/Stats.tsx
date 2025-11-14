import StatCard from "@/components/StatCard"
import StatCardSkeleton from "@/components/StatCardSkeleton"
import { useGetReportSummary } from "@/services/hooks/reportHook"

type StatsProps = {
  period: string
}

function Stats({ period }: StatsProps) {
  const { isPending, data } = useGetReportSummary(period)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {isPending ? (
        [...Array(3)].map((_, i) => (
          <StatCardSkeleton key={`report-summary ${i}`} />
        ))
      ) : (
        <>
          <StatCard
            title="Total Pendapatan"
            value={`Rp ${(data?.totalRevenue || 0).toLocaleString("id-ID")}`}
          />
          <StatCard
            title="Total Pesanan"
            value={(data?.totalOrders || 0).toLocaleString()}
          />
          <StatCard
            title="Rata-rate Pesanan"
            value={`Rp ${(data?.averageOrderValue || 0).toLocaleString(
              "id-ID"
            )}`}
          />
        </>
      )}
    </div>
  )
}

export default Stats
