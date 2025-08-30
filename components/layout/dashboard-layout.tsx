import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} subtitle={subtitle} />

        {/* Zone de contenu */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto bg-sidebar p-[20px] rounded-3xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
