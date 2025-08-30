import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { JournalHeader } from "@/components/journal/journal-header"
import { JournalTimeline } from "@/components/journal/journal-timeline"
import { JournalStats } from "@/components/journal/journal-stats"
import { getActivityLog } from "@/lib/actions"

export default async function JournalPage() {
  const activities = await getActivityLog()

  return (
    <DashboardLayout title="Journal d'Activité" subtitle="Suivez toutes les activités et opérations de votre système.">
      <div className="space-y-6">
        <JournalHeader />
        <JournalStats activities={activities} />
        <JournalTimeline activities={activities} />
      </div>
    </DashboardLayout>
  )
}
