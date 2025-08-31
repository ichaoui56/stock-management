import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { JournalHeader } from "@/components/journal/journal-header"

import { JournalContentWrapper } from "@/components/journal/JournalContentWrapper"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function JournalPage() {

  const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  return (
    <DashboardLayout title="Journal d'Activité" subtitle="Suivez toutes les activités et opérations de votre système.">
      <div className="space-y-6">
        <JournalHeader />
        <JournalContentWrapper />
      </div>
    </DashboardLayout>
  )
}
