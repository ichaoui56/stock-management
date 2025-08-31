import { auth } from "@/auth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SaleForm } from "@/components/sales/sale-form"
import { getProducts } from "@/lib/actions"
import { redirect } from "next/navigation"

export default async function NewSalePage() {
  const products = await getProducts()

  const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  return (
    <DashboardLayout title="Nouvelle Vente" subtitle="Enregistrez une nouvelle transaction commerciale.">
      <div className="max-w-4xl mx-auto">
        <SaleForm products={products} />
      </div>
    </DashboardLayout>
  )
}
