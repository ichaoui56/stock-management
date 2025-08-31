"use client"
import { signOutAction } from "@/lib/actions/auth-actions"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface SignOutProps {
  className?: string
}

export function SignOut({ className }: SignOutProps) {
  const handleSignOut = async () => {
    await signOutAction()
  }

  return (
    <button
      onClick={handleSignOut}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        className
      )}
    >
      <LogOut className="h-4 w-4" />
      Déconnexion
    </button>
  )
}