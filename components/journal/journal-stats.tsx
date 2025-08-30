import { Card, CardContent } from "@/components/ui/card"
import { FileText, ShoppingCart, Package, User } from "lucide-react"

interface Activity {
  id: string
  type: "sale" | "stock" | "product" | "user"
  message: string
  created_at: Date
}

interface JournalStatsProps {
  activities: Activity[]
}

export function JournalStats({ activities }: JournalStatsProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayActivities = activities.filter((activity) => new Date(activity.created_at) >= today)
  const salesActivities = activities.filter((activity) => activity.type === "sale")
  const stockActivities = activities.filter((activity) => activity.type === "stock")
  const productActivities = activities.filter((activity) => activity.type === "product")

  const stats = [
    {
      title: "Activités Aujourd'hui",
      value: todayActivities.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Ventes",
      value: salesActivities.length,
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Mouvements Stock",
      value: stockActivities.length,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Gestion Produits",
      value: productActivities.length,
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border border-border rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
