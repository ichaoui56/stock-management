import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Plus, Settings, LogIn, LogOut } from "lucide-react"

const userActivities = [
  {
    id: "1",
    type: "sale",
    message: "Vente réalisée - Ordinateur Portable Dell",
    details: "Montant: 650 €, Client: Jean Dupont",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
  },
  {
    id: "2",
    type: "product",
    message: "Produit ajouté - Casque Audio",
    details: "Catégorie: Audio, Stock initial: 60 unités",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // Il y a 4h
  },
  {
    id: "3",
    type: "stock",
    message: "Ajustement de stock - Souris Logitech",
    details: "+20 unités ajoutées",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // Il y a 6h
  },
  {
    id: "4",
    type: "login",
    message: "Connexion à l'application",
    details: "Connexion depuis Paris, France",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // Il y a 8h
  },
  {
    id: "5",
    type: "sale",
    message: "Vente réalisée - Clavier Mécanique",
    details: "Montant: 120 €, Client: Marie Martin",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hier
  },
  {
    id: "6",
    type: "settings",
    message: "Paramètres modifiés",
    details: "Notifications activées",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Il y a 2 jours
  },
]

export function ActivityHistory() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ShoppingCart className="w-4 h-4" />
      case "stock":
        return <Package className="w-4 h-4" />
      case "product":
        return <Plus className="w-4 h-4" />
      case "settings":
        return <Settings className="w-4 h-4" />
      case "login":
        return <LogIn className="w-4 h-4" />
      case "logout":
        return <LogOut className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "sale":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Vente
          </Badge>
        )
      case "stock":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Stock
          </Badge>
        )
      case "product":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Produit
          </Badge>
        )
      case "settings":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            Paramètres
          </Badge>
        )
      case "login":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Connexion
          </Badge>
        )
      default:
        return <Badge variant="outline">Activité</Badge>
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-green-600 bg-green-100"
      case "stock":
        return "text-blue-600 bg-blue-100"
      case "product":
        return "text-purple-600 bg-purple-100"
      case "settings":
        return "text-orange-600 bg-orange-100"
      case "login":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Il y a moins d'une heure"
    if (diffInHours < 24) return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`

    return date.toLocaleDateString("fr-FR")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique d'Activité ({userActivities.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userActivities.length > 0 ? (
            <div className="relative">
              {/* Ligne de timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              {userActivities.map((activity) => (
                <div key={activity.id} className="relative flex items-start gap-4 pb-6">
                  {/* Icône de l'activité */}
                  <div className={`relative z-10 p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Contenu de l'activité */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getActivityBadge(activity.type)}
                      <span className="text-sm text-muted-foreground">{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    {activity.details && <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Aucune activité enregistrée</h3>
              <p className="text-muted-foreground">Vos activités apparaîtront ici.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
