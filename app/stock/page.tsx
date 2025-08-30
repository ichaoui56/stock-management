import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StockHeader } from "@/components/stock/stock-header"
import { StockContentWrapper } from "@/components/stock/StockContentWrapper"

export default async function StockPage() {

  return (
    <DashboardLayout title="Gestion du Stock" subtitle="Suivez et gérez vos mouvements de stock en temps réel.">
      <div className="space-y-6">
        <StockHeader />
        <StockContentWrapper />
      </div>
    </DashboardLayout>
  )
}
