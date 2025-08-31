"use client"

import { Search, Bell, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOutAction } from "@/lib/actions/auth-actions"
import { useSession } from "next-auth/react"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { data: session } = useSession()
  const handleSignOut = async () => {
    await signOutAction()
  }

  return (
    
    <header className="h-16 bg-sidebar mx-[15px] mt-[15px] rounded-xl border-border p-10 flex items-center justify-between">
      {/* Titre de la page */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      {/* Barre de recherche et actions */}
      <div className="flex items-center gap-4">
        {/* Recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-10 w-80 bg-muted/50 border-0 focus-visible:ring-1" />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ⌘F
          </kbd>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Mail className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground">
            3
          </span>
        </Button>

        {/* Profil utilisateur */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 h-auto">
              <Avatar className="w-8 h-8">
                <AvatarImage src={session?.user?.image || "/admin-avatar.png"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">AS</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{session?.user?.name}</p>
                <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive">Déconnexion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
