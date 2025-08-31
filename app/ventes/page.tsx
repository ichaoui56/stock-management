import { auth } from "@/auth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SalesHeader } from "@/components/sales/sales-header"
import { SalesContentWrapper } from "@/components/sales/SalesContentWrapper"
import { redirect } from "next/navigation"

export default async function SalesPage() {

  const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  return (
    <DashboardLayout title="Gestion des Ventes" subtitle="Suivez vos ventes et gérez vos transactions commerciales.">
      <div className="space-y-6">
        <SalesHeader />
       <SalesContentWrapper />
      </div>
    </DashboardLayout>
  )
}
