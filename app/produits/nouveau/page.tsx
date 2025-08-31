import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductForm } from "@/components/products/product-form"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function NewProductPage() {
  
 const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  return (
    <DashboardLayout title="Nouveau Produit" subtitle="Ajoutez un nouveau produit à votre inventaire.">
      <div className="mx-auto">
        <ProductForm />
      </div>
    </DashboardLayout>
  )
}
