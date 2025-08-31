import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "sale",
    message: "Vente réalisée - Ordinateur Portable Dell",
    client: "Jean Dupont",
    amount: "650 MAD",
    time: "Il y a 2 heures",
    icon: ShoppingCart,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "stock",
    message: "Stock ajouté - Souris Logitech",
    quantity: "+50 unités",
    time: "Il y a 4 heures",
    icon: Package,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "alert",
    message: "Alerte stock faible - Écran 24 pouces",
    quantity: "3 unités restantes",
    time: "Il y a 6 heures",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    id: 4,
    type: "profit",
    message: "Objectif mensuel atteint",
    amount: "15 000 MAD de bénéfices",
    time: "Hier",
    icon: TrendingUp,
    color: "text-green-600",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  {activity.client && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.client}
                    </Badge>
                  )}
                  {activity.amount && <span className="text-sm font-medium text-green-600">{activity.amount}</span>}
                  {activity.quantity && <span className="text-sm text-muted-foreground">{activity.quantity}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
