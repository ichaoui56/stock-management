import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import type { Product } from "@/types"

interface StockOverviewProps {
  products: Product[]
}

export function StockOverview({ products }: StockOverviewProps) {
  const lowStockProducts = products.filter((product) => product.stock_qty <= product.min_stock_alert)
  const outOfStockProducts = products.filter((product) => product.stock_qty === 0)
  const wellStockedProducts = products.filter((product) => product.stock_qty > product.min_stock_alert)

  return (
    <div className="space-y-6">
      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border border-border rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Produits en Stock</p>
                <p className="text-2xl font-bold text-green-600">{wellStockedProducts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stock Faible</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rupture de Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes de stock */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Alertes de Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {outOfStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">{product.name}</p>
                      <p className="text-sm text-red-700">Rupture de stock</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">0 unités</Badge>
                    <Button size="sm" variant="outline">
                      Réapprovisionner
                    </Button>
                  </div>
                </div>
              ))}

              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-900">{product.name}</p>
                      <p className="text-sm text-orange-700">Stock faible - Seuil: {product.min_stock_alert}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {product.stock_qty} unités
                    </Badge>
                    <Button size="sm" variant="outline">
                      Réapprovisionner
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
