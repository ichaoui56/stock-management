import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Settings, TrendingUp, TrendingDown } from "lucide-react"
import type { StockMovement } from "@/types"

interface StockMovementsProps {
  movements: StockMovement[]
}

export function StockMovements({ movements }: StockMovementsProps) {
  const getMovementIcon = (type: StockMovement["movement_type"]) => {
    switch (type) {
      case "BUY":
        return <Package className="w-4 h-4" />
      case "SELL":
        return <ShoppingCart className="w-4 h-4" />
      case "ADJUST":
        return <Settings className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getMovementBadge = (type: StockMovement["movement_type"]) => {
    switch (type) {
      case "BUY":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Achat
          </Badge>
        )
      case "SELL":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Vente
          </Badge>
        )
      case "ADJUST":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Ajustement
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getQuantityDisplay = (movement: StockMovement) => {
    const isPositive =
      movement.movement_type === "BUY" || (movement.movement_type === "ADJUST" && movement.quantity > 0)
    const icon = isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
    const color = isPositive ? "text-green-600" : "text-red-600"
    const sign = isPositive ? "+" : ""

    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span className="font-medium">
          {sign}
          {Math.abs(movement.quantity)}
        </span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mouvements de Stock Récents ({movements.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {movements.length > 0 ? (
            movements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-muted">{getMovementIcon(movement.movement_type)}</div>
                  <div>
                    <p className="font-medium">{movement.product?.name || "Produit inconnu"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getMovementBadge(movement.movement_type)}
                      {movement.reason && <span className="text-sm text-muted-foreground">• {movement.reason}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {getQuantityDisplay(movement)}
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(movement.created_at).toLocaleDateString("fr-FR")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(movement.created_at).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Aucun mouvement de stock</h3>
              <p className="text-muted-foreground">Les mouvements de stock apparaîtront ici.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
