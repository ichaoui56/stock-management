import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StockHeader } from "@/components/stock/stock-header"
import { StockOverview } from "@/components/stock/stock-overview"
import { StockMovements } from "@/components/stock/stock-movements"
import { getProducts, getStockMovements } from "@/lib/actions"

export default async function StockPage() {
  const products = await getProducts()
  const movements = await getStockMovements()

  return (
    <DashboardLayout title="Gestion du Stock" subtitle="Suivez et gérez vos mouvements de stock en temps réel.">
      <div className="space-y-6">
        <StockHeader />
        <StockOverview products={products} />
        <StockMovements movements={movements} />
      </div>
    </DashboardLayout>
  )
}
