import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { getUserProfile, getUserStats } from "@/lib/actions"

export async function ProfileContentWrapper() {
  const userProfile = await getUserProfile()
  const userStats = await getUserStats()


  return (
    <>
      <ProfileHeader user={userProfile} stats={userStats} />
      <ProfileTabs user={userProfile} />
    </>
  )
}