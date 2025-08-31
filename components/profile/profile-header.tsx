import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Mail, Phone, Calendar, MapPin } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar_url?: string
  created_at: Date
  role: string
  location?: string
}

interface UserStats {
  totalSales: number
  totalRevenue: number
  productsAdded: number
  lastLogin: Date
}

interface ProfileHeaderProps {
  user: User
  stats: UserStats
}

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo de profil */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {user.role}
            </Badge>
          </div>

          {/* Informations utilisateur */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">Gestionnaire de stock</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Membre depuis {new Date(user.created_at).toLocaleDateString("fr-FR")}</span>
              </div>
              {user.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-48">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{stats.totalSales}</p>
              <p className="text-sm text-muted-foreground">Ventes réalisées</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.totalRevenue.toLocaleString("fr-FR")} MAD</p>
              <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.productsAdded}</p>
              <p className="text-sm text-muted-foreground">Produits ajoutés</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Dernière connexion</p>
              <p className="text-sm font-medium">{new Date(stats.lastLogin).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
