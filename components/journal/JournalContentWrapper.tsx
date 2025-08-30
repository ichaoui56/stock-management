import { ProductsStats } from "@/components/products/products-stats"
import { ProductsTable } from "@/components/products/products-table"
import { getActivityLog } from "@/lib/actions"
import { JournalStats } from "./journal-stats"
import { JournalTimeline } from "./journal-timeline"

export async function JournalContentWrapper() {
  const activities = await getActivityLog()

  return (
    <>
      <JournalStats activities={activities} />
      <JournalTimeline activities={activities} />
    </>
  )
}