import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsContentWrapper } from "@/components/products/ProductsContentWrapper"

export default async function ProductsPage() {

  return (
    <DashboardLayout title="Gestion des Produits" subtitle="Gérez votre inventaire et suivez vos stocks en temps réel.">
      <div className="space-y-6">
        <ProductsHeader />
        <ProductsContentWrapper />
      </div>
    </DashboardLayout>
  )
}
