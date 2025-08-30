import { StockOverview } from "@/components/stock/stock-overview"
import { StockMovements } from "@/components/stock/stock-movements"
import { getProducts, getStockMovements } from "@/lib/actions"

export async function StockContentWrapper() {
  const products = await getProducts()
  const movements = await getStockMovements()

  return (
    <>
       <StockOverview products={products} />
       <StockMovements movements={movements} />
    </>
  )
}