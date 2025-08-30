import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { getUserProfile, getUserStats } from "@/lib/actions"

export default async function ProfilePage() {
  const userProfile = await getUserProfile()
  const userStats = await getUserStats()

  return (
    <DashboardLayout title="Mon Profil" subtitle="Gérez vos informations personnelles et paramètres du compte.">
      <div className="space-y-6">
        <ProfileHeader user={userProfile} stats={userStats} />
        <ProfileTabs user={userProfile} />
      </div>
    </DashboardLayout>
  )
}
