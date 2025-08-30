import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfileContentWrapper } from "@/components/profile/ProfileContentWrapper"


export default  function ProfilePage() {
  
  return (
    <DashboardLayout title="Mon Profil" subtitle="Gérez vos informations personnelles et paramètres du compte.">
      <div className="space-y-6">
        <ProfileContentWrapper />
      </div>
    </DashboardLayout>
  )
}
