import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductForm } from "@/components/products/product-form"

export default function NewProductPage() {
  return (
    <DashboardLayout title="Nouveau Produit" subtitle="Ajoutez un nouveau produit à votre inventaire.">
      <div className="max-w-2xl mx-auto">
        <ProductForm />
      </div>
    </DashboardLayout>
  )
}
