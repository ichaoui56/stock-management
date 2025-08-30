"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, Warehouse, FileText, User, Settings, LogOut } from "lucide-react"

const navigation = [
  {
    name: "Tableau de Bord",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Produits",
    href: "/produits",
    icon: Package,
  },
  {
    name: "Ventes",
    href: "/ventes",
    icon: ShoppingCart,
  },
  {
    name: "Stock",
    href: "/stock",
    icon: Warehouse,
  },
  {
    name: "Journal",
    href: "/journal",
    icon: FileText,
  },
  {
    name: "Profil",
    href: "/profil",
    icon: User,
  },
]

const generalNavigation = [
  {
    name: "Paramètres",
    href: "/parametres",
    icon: Settings,
  },
  {
    name: "Déconnexion",
    href: "/connexion",
    icon: LogOut,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">StockPro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        <div>
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">MENU</p>
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">GÉNÉRAL</p>
          <ul className="space-y-1">
            {generalNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}
