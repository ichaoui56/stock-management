import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductsTable } from "@/components/products/products-table"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsStats } from "@/components/products/products-stats"
import { getProducts } from "@/lib/actions"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <DashboardLayout title="Gestion des Produits" subtitle="Gérez votre inventaire et suivez vos stocks en temps réel.">
      <div className="space-y-6">
        <ProductsHeader />
        <ProductsStats products={products} />
        <ProductsTable products={products} />
      </div>
    </DashboardLayout>
  )
}
