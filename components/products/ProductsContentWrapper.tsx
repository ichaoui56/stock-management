import { ProductsStats } from "@/components/products/products-stats"
import { ProductsTable } from "@/components/products/products-table"
import { getProducts } from "@/lib/actions"

export async function ProductsContentWrapper() {
  const products = await getProducts()

  return (
    <>
      <ProductsStats products={products} />
      <ProductsTable products={products} />
    </>
  )
}