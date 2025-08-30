import { SalesStats } from "@/components/sales/sales-stats"
import { SalesTable } from "@/components/sales/sales-table"
import { getSales } from "@/lib/actions"

export async function SalesContentWrapper() {
  const sales = await getSales()

  return (
    <>
      <SalesStats sales={sales} />
      <SalesTable sales={sales} />
    </>
  )
}