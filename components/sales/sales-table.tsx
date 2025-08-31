"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, Printer, Edit, Trash2, ShoppingCart, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Sale } from "@/types"

interface SalesTableProps {
  sales: Sale[]
}

export function SalesTable({ sales }: SalesTableProps) {
  const getStatusBadge = (status: Sale["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Terminée
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            En attente
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">Inconnue</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des Ventes ({sales.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Bénéfice</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Marge</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => {
                const margin = ((sale.profit / sale.total_sell) * 100).toFixed(1)

                return (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{new Date(sale.sale_date).toLocaleDateString("fr-FR")}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(sale.sale_date).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{sale.client_name || "Client anonyme"}</p>
                        {sale.client_phone && <p className="text-sm text-muted-foreground">{sale.client_phone}</p>}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{sale.total_sell.toLocaleString("fr-FR")} MAD</TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">+{sale.profit.toLocaleString("fr-FR")} MAD</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{margin}%</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Printer className="w-4 h-4" />
                            Imprimer facture
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Modifier
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

        {sales.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Aucune vente enregistrée</h3>
            <p className="text-muted-foreground mb-4">Commencez par enregistrer votre première vente.</p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle vente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
