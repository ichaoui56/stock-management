import { Card, CardContent } from "@/components/ui/card"
import { Package, Euro, AlertTriangle, TrendingUp } from "lucide-react"
import type { Product } from "@/types"

interface ProductsStatsProps {
  products: Product[]
}

export function ProductsStats({ products }: ProductsStatsProps) {
  const totalProducts = products.length
  const totalStockValue = products.reduce((sum, product) => sum + product.buy_price * product.stock_qty, 0)
  const lowStockProducts = products.filter((product) => product.stock_qty <= product.min_stock_alert).length
  const totalUnits = products.reduce((sum, product) => sum + product.stock_qty, 0)

  const stats = [
    {
      title: "Total Produits",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Valeur du Stock",
      value: `${totalStockValue.toLocaleString("fr-FR")} €`,
      icon: Euro,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Unités en Stock",
      value: totalUnits.toLocaleString("fr-FR"),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Alertes Stock",
      value: lowStockProducts,
      icon: AlertTriangle,
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
