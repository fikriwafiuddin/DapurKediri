import StatCard from "@/components/StatCard"

function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Pendapatan"
        value={`Rp ${(1000).toLocaleString("id-ID")}`}
      />
      <StatCard title="Total Pesanan" value={(100).toLocaleString()} />
      <StatCard
        title="Rata-rate Pesanan"
        value={`Rp ${(100000).toLocaleString("id-ID")}`}
      />
    </div>
  )
}

export default Stats
