import { Card, CardContent } from "@/components/ui/card"
import { Euro, TrendingUp, ShoppingCart, Users } from "lucide-react"
import type { Sale } from "@/types"

interface SalesStatsProps {
  sales: Sale[]
}

export function SalesStats({ sales }: SalesStatsProps) {
  const totalSales = sales.length
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_sell, 0)
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0)
  const uniqueClients = new Set(sales.filter((sale) => sale.client_name).map((sale) => sale.client_name)).size

  const stats = [
    {
      title: "Total Ventes",
      value: totalSales,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Chiffre d'Affaires",
      value: `${totalRevenue.toLocaleString("fr-FR")} €`,
      icon: Euro,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Bénéfices",
      value: `${totalProfit.toLocaleString("fr-FR")} €`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Clients Uniques",
      value: uniqueClients,
      icon: Users,
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
