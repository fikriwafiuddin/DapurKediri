"use client"

import SummarySection from "./SummarySection"
import LatestOrdersSection from "./LatestOrdersSection"

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Ringkasan informasi restoran Anda
        </p>
      </div>

      <SummarySection />

      <LatestOrdersSection />
    </div>
  )
}

export default DashboardPage
