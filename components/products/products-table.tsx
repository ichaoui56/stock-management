"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Edit, Trash2, Package, AlertTriangle, TrendingUp, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteProduct, adjustProductStock } from "@/lib/actions/product-actions"
import { useTransition } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { Product } from "@/lib/actions/product-actions"

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  const stockFilter = searchParams.get('stock')

  const getStockStatus = (product: Product) => {
    if (product.stockQty === 0) {
      return { label: "Rupture", variant: "destructive" as const, icon: AlertTriangle }
    }
    if (product.stockQty <= 10) {
      return { label: "Stock faible", variant: "secondary" as const, icon: AlertTriangle }
    }
    return { label: "En stock", variant: "default" as const, icon: Package }
  }

  const handleDelete = (productId: string, productName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) {
      return
    }

    startTransition(async () => {
      const result = await deleteProduct(productId)
      if (result.success) {
        toast.success("Produit supprimé avec succès")
      } else {
        toast.error(result.error || "Erreur lors de la suppression")
      }
    })
  }

  const handleStockAdjust = (productId: string, currentStock: number, productName: string) => {
    const newStock = prompt(
      `Ajuster le stock pour "${productName}"\nStock actuel: ${currentStock}\nNouvel stock:`,
      currentStock.toString()
    )
    
    if (newStock === null || newStock.trim() === "") return
    
    const stockValue = parseInt(newStock)
    if (isNaN(stockValue) || stockValue < 0) {
      toast.error("Veuillez entrer une quantité valide")
      return
    }

    startTransition(async () => {
      const result = await adjustProductStock(productId, stockValue, "ADJUST")
      if (result.success) {
        toast.success("Stock mis à jour avec succès")
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour du stock")
      }
    })
  }

  // Highlight search terms in product name
  const highlightSearchTerm = (text: string, searchTerm: string | null) => {
    if (!searchTerm) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Liste des Produits ({products.length})
            {searchQuery && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                pour "{searchQuery}"
              </span>
            )}
          </CardTitle>
          
          {(searchQuery || stockFilter) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <span>Résultats filtrés</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {products.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Prix d'achat</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Valeur totale</TableHead>
                  <TableHead>Dernière MAJ</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const status = getStockStatus(product)
                  const totalValue = product.buyPrice * product.stockQty

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {highlightSearchTerm(product.name, searchQuery)}
                          </p>
                          {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {highlightSearchTerm(product.description, searchQuery)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.buyPrice.toLocaleString("fr-FR", { 
                          style: 'currency', 
                          currency: 'MAD' 
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{product.stockQty}</span>
                          <span className="text-sm text-muted-foreground">unités</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <status.icon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {totalValue.toLocaleString("fr-FR", { 
                          style: 'currency', 
                          currency: 'MAD' 
                        })}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(product.updatedAt).toLocaleDateString("fr-FR", {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={isPending}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link 
                                href={`/produits/modifier/${product.id}`}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Edit className="w-4 h-4" />
                                Modifier
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 cursor-pointer"
                              onClick={() => handleStockAdjust(product.id, product.stockQty, product.name)}
                            >
                              <TrendingUp className="w-4 h-4" />
                              Ajuster Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 text-destructive cursor-pointer"
                              onClick={() => handleDelete(product.id, product.name)}
                            >
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
        ) : (
          <EmptyState searchQuery={searchQuery} stockFilter={stockFilter} />
        )}
      </CardContent>
    </Card>
  )
}

// Empty state component
function EmptyState({ 
  searchQuery, 
  stockFilter 
}: { 
  searchQuery: string | null
  stockFilter: string | null 
}) {
  const hasFilters = searchQuery || (stockFilter && stockFilter !== 'all')

  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-muted-foreground mb-4">
          Aucun produit ne correspond à vos critères de recherche.
        </p>
        <div className="flex justify-center gap-2">
          <Link href="/produits">
            <Button variant="outline">
              Voir tous les produits
            </Button>
          </Link>
          <Link href="/produits/nouveau">
            <Button className="gap-2">
              <Package className="w-4 h-4" />
              Ajouter un produit
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">
        Aucun produit trouvé
      </h3>
      <p className="text-muted-foreground mb-4">
        Commencez par ajouter votre premier produit à l'inventaire.
      </p>
      <Link href="/produits/nouveau">
        <Button className="gap-2">
          <Package className="w-4 h-4" />
          Ajouter un produit
        </Button>
      </Link>
    </div>
  )
}