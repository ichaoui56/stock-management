"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
import type { Product } from "@/lib/actions/product-actions"

interface ProductsStatsProps {
  products: Product[]
  totalCount?: number
  currentFilters?: {
    searchQuery?: string
    stockFilter?: string
  }
}

export function ProductsStats({ 
  products, 
  totalCount, 
  currentFilters 
}: ProductsStatsProps) {
  // Calculate stats from current page products
  const lowStockProducts = products.filter(p => p.stockQty > 0 && p.stockQty <= 10).length
  const outOfStockProducts = products.filter(p => p.stockQty === 0).length
  const totalStockValue = products.reduce((sum, p) => sum + (p.buyPrice * p.stockQty), 0)
  const totalUnits = products.reduce((sum, p) => sum + p.stockQty, 0)
  
  // Use totalCount if provided (for filtered results), otherwise use products length
  const totalProducts = totalCount ?? products.length
  const hasFilters = currentFilters?.searchQuery || (currentFilters?.stockFilter && currentFilters.stockFilter !== 'all')

  const stats = [
    {
      title: "Total Produits",
      value: totalProducts.toLocaleString("fr-FR"),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Produits en catalogue",
    },
    {
      title: "Valeur du Stock",
      value: totalStockValue.toLocaleString("fr-FR", { 
        style: 'currency', 
        currency: 'MAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Valeur totale à prix d'achat",
    },
    {
      title: "Unités en Stock",
      value: totalUnits.toLocaleString("fr-FR"),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Total des unités disponibles",
    },
    {
      title: "Alertes Stock",
      value: `${lowStockProducts} / ${outOfStockProducts}`,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Stock faible / Ruptures",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}