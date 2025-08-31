import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfileContentWrapper } from "@/components/profile/ProfileContentWrapper"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {

  const session = await auth()
  if (!session) {
    redirect("/connexion")
  }

  return (
    <DashboardLayout title="Mon Profil" subtitle="Gérez vos informations personnelles et paramètres du compte.">
      <div className="space-y-6">
        <ProfileContentWrapper />
      </div>
    </DashboardLayout>
  )
}
