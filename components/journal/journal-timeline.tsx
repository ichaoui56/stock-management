import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Plus, User, FileText } from "lucide-react"

interface Activity {
  id: string
  type: "sale" | "stock" | "product" | "user"
  message: string
  details?: string
  user?: string
  created_at: Date
}

interface JournalTimelineProps {
  activities: Activity[]
}

export function JournalTimeline({ activities }: JournalTimelineProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "sale":
        return <ShoppingCart className="w-4 h-4" />
      case "stock":
        return <Package className="w-4 h-4" />
      case "product":
        return <Plus className="w-4 h-4" />
      case "user":
        return <User className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getActivityBadge = (type: Activity["type"]) => {
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
      case "user":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            Utilisateur
          </Badge>
        )
      default:
        return <Badge variant="outline">Activité</Badge>
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "sale":
        return "text-green-600 bg-green-100"
      case "stock":
        return "text-blue-600 bg-blue-100"
      case "product":
        return "text-purple-600 bg-purple-100"
      case "user":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline des Activités ({activities.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            <div className="relative">
              {/* Ligne de timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              {activities.map((activity, index) => (
                <div key={activity.id} className="relative flex items-start gap-4 pb-6">
                  {/* Icône de l'activité */}
                  <div className={`relative z-10 p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Contenu de l'activité */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getActivityBadge(activity.type)}
                      <span className="text-sm text-muted-foreground">
                        {new Date(activity.created_at).toLocaleDateString("fr-FR")} à{" "}
                        {new Date(activity.created_at).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    {activity.details && <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>}
                    {activity.user && <p className="text-xs text-muted-foreground mt-2">Par {activity.user}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Aucune activité enregistrée</h3>
              <p className="text-muted-foreground">Les activités du système apparaîtront ici.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
