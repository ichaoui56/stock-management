// app/produits/modifier/[id]/page.tsx

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductForm } from "@/components/products/product-form"
import { getProductById } from "@/lib/actions/product-actions"
import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"

interface EditProductPageProps {
  params: Promise<{ 
    id: string
  }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  const product = await getProductById((await params).id)
  if (!product) {
    notFound()
  }

  return (
    <DashboardLayout 
      title="Modifier le Produit" 
      subtitle={`Modifiez les informations de "${product.name}"`}
    >
      <ProductForm product={product} isEditing={true} />
    </DashboardLayout>
  )
}