import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { JournalHeader } from "@/components/journal/journal-header"

import { JournalContentWrapper } from "@/components/journal/JournalContentWrapper"

export default function JournalPage() {

  return (
    <DashboardLayout title="Journal d'Activité" subtitle="Suivez toutes les activités et opérations de votre système.">
      <div className="space-y-6">
        <JournalHeader />
        <JournalContentWrapper />
      </div>
    </DashboardLayout>
  )
}
