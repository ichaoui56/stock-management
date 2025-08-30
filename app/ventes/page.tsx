import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SalesHeader } from "@/components/sales/sales-header"
import { SalesStats } from "@/components/sales/sales-stats"
import { SalesTable } from "@/components/sales/sales-table"
import { getSales } from "@/lib/actions"

export default async function SalesPage() {
  const sales = await getSales()

  return (
    <DashboardLayout title="Gestion des Ventes" subtitle="Suivez vos ventes et gérez vos transactions commerciales.">
      <div className="space-y-6">
        <SalesHeader />
        <SalesStats sales={sales} />
        <SalesTable sales={sales} />
      </div>
    </DashboardLayout>
  )
}
