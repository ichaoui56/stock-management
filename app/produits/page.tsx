// Updated page.tsx - remove ProductsHeader since it's now in ContentWrapper
import { DashboardLayout } from "@/components/layout/dashboard-layout"
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

  const params = await searchParams
  const { search, stock, page, per_page } = params

  const pageNumber = page ? Math.max(1, parseInt(page)) : 1
  const itemsPerPage = per_page ? Math.max(1, Math.min(100, parseInt(per_page))) : 10

  return (
    <DashboardLayout 
      title="Gestion des Produits" 
      subtitle="Gérez votre inventaire et suivez vos stocks en temps réel."
    >
      <div className="space-y-6">
        <ProductsContentWrapper 
          searchQuery={search} 
          stockFilter={stock}
          page={pageNumber}
          perPage={itemsPerPage}
        />
      </div>
    </DashboardLayout>
  )
}