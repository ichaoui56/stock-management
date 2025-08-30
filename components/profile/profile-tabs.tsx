"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "./personal-info-form"
import { SecurityForm } from "./security-form"
import { AppSettings } from "./app-settings"
import { ActivityHistory } from "./activity-history"
import { Shield, Settings, Activity } from "lucide-react"

interface ProfileTabsProps {
  user: {
    id: string
    name: string
    email: string
    phone?: string
    avatar_url?: string
    created_at: Date
    role: string
    location?: string
  }
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal" className="gap-2">
          {/* Placeholder for User icon */}
          Informations
        </TabsTrigger>
        <TabsTrigger value="security" className="gap-2">
          <Shield className="w-4 h-4" />
          Sécurité
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-2">
          <Settings className="w-4 h-4" />
          Paramètres
        </TabsTrigger>
        <TabsTrigger value="activity" className="gap-2">
          <Activity className="w-4 h-4" />
          Activité
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalInfoForm user={user} />
      </TabsContent>

      <TabsContent value="security">
        <SecurityForm />
      </TabsContent>

      <TabsContent value="settings">
        <AppSettings />
      </TabsContent>

      <TabsContent value="activity">
        <ActivityHistory />
      </TabsContent>
    </Tabs>
  )
}
