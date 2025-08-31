import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StockHeader } from "@/components/stock/stock-header"
import { StockContentWrapper } from "@/components/stock/StockContentWrapper"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function StockPage() {

 const session = await auth()
  if (!session) {
    redirect("/connexion")
  }
  
  return (
    <DashboardLayout title="Gestion du Stock" subtitle="Suivez et gérez vos mouvements de stock en temps réel.">
      <div className="space-y-6">
        <StockHeader />
        <StockContentWrapper />
      </div>
    </DashboardLayout>
  )
}
