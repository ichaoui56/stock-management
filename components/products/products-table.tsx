"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Edit, Trash2, Package, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Product } from "@/types"

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const getStockStatus = (product: Product) => {
    if (product.stock_qty === 0) {
      return { label: "Rupture", variant: "destructive" as const, icon: AlertTriangle }
    }
    if (product.stock_qty <= product.min_stock_alert) {
      return { label: "Stock faible", variant: "secondary" as const, icon: AlertTriangle }
    }
    return { label: "En stock", variant: "default" as const, icon: Package }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Produits ({products.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix d'achat</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const status = getStockStatus(product)
                const totalValue = product.buy_price * product.stock_qty

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        {product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category || "Non classé"}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.buy_price.toLocaleString("fr-FR")} €</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.stock_qty}</span>
                        <span className="text-sm text-muted-foreground">unités</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="gap-1">
                        <status.icon className="w-3 h-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{totalValue.toLocaleString("fr-FR")} €</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Package className="w-4 h-4" />
                            Ajuster Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-4">Commencez par ajouter votre premier produit à l'inventaire.</p>
            <Button className="gap-2">
              <Package className="w-4 h-4" />
              Ajouter un produit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
