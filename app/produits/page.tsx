// app/produits/page.tsx
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductsHeader } from "@/components/products/products-header"
import { ProductsContentWrapper } from "@/components/products/ProductsContentWrapper"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

interface ProductsPageProps {
  searchParams: Promise<{ 
    search?: string
    stock?: string
    page?: string
    per_page?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  const { search, stock, page, per_page } = await searchParams

  return (
    <DashboardLayout 
      title="Gestion des Produits" 
      subtitle="Gérez votre inventaire et suivez vos stocks en temps réel."
    >
      <div className="space-y-6">
        <ProductsHeader 
          initialSearch={search}
          initialStockFilter={stock}
        />
        <ProductsContentWrapper 
          searchQuery={search} 
          stockFilter={stock}
          page={page ? parseInt(page) : 1}
          perPage={per_page ? parseInt(per_page) : 10}
        />
      </div>
    </DashboardLayout>
  )
}