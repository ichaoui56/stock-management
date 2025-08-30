"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, ShoppingCart, Plus, Minus, Trash2, User, Calculator } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/types"

interface SaleFormProps {
  products: Product[]
}

interface SaleItem {
  product: Product
  quantity: number
  sellPrice: number
}

export function SaleForm({ products }: SaleFormProps) {
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [saleItems, setSaleItems] = useState<SaleItem[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")

  const addProduct = () => {
    const product = products.find((p) => p.id === selectedProductId)
    if (!product) return

    const existingItem = saleItems.find((item) => item.product.id === product.id)
    if (existingItem) {
      setSaleItems(
        saleItems.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setSaleItems([
        ...saleItems,
        {
          product,
          quantity: 1,
          sellPrice: product.buy_price * 1.3, // Marge de 30% par défaut
        },
      ])
    }
    setSelectedProductId("")
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId)
      return
    }
    setSaleItems(saleItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const updateSellPrice = (productId: string, sellPrice: number) => {
    setSaleItems(saleItems.map((item) => (item.product.id === productId ? { ...item, sellPrice } : item)))
  }

  const removeProduct = (productId: string) => {
    setSaleItems(saleItems.filter((item) => item.product.id !== productId))
  }

  const totalBuy = saleItems.reduce((sum, item) => sum + item.product.buy_price * item.quantity, 0)
  const totalSell = saleItems.reduce((sum, item) => sum + item.sellPrice * item.quantity, 0)
  const totalProfit = totalSell - totalBuy
  const marginPercent = totalSell > 0 ? ((totalProfit / totalSell) * 100).toFixed(1) : "0"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/ventes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Nouvelle Vente</h1>
          <p className="text-muted-foreground">Enregistrez une nouvelle transaction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations client */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations Client
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Nom du client</Label>
              <Input
                id="client_name"
                placeholder="Nom du client (optionnel)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_phone">Téléphone</Label>
              <Input
                id="client_phone"
                placeholder="+33 1 23 45 67 89"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Résumé de la vente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Résumé
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coût total:</span>
                <span className="font-medium">{totalBuy.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prix de vente:</span>
                <span className="font-medium">{totalSell.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Bénéfice:</span>
                <span className="text-green-600">+{totalProfit.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marge:</span>
                <span className="font-medium">{marginPercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full gap-2" disabled={saleItems.length === 0}>
              <Save className="w-4 h-4" />
              Enregistrer la vente
            </Button>
            <Button variant="outline" className="w-full gap-2 bg-transparent" disabled={saleItems.length === 0}>
              <ShoppingCart className="w-4 h-4" />
              Enregistrer et imprimer
            </Button>
            <Link href="/ventes">
              <Button variant="outline" className="w-full bg-transparent">
                Annuler
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Sélection de produits */}
      <Card>
        <CardHeader>
          <CardTitle>Ajouter des Produits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sélectionner un produit" />
              </SelectTrigger>
              <SelectContent>
                {products
                  .filter((product) => product.stock_qty > 0)
                  .map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - Stock: {product.stock_qty} - {product.buy_price.toLocaleString("fr-FR")} €
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={addProduct} disabled={!selectedProductId} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des produits */}
      {saleItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Produits Sélectionnés ({saleItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Prix d'achat</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix de vente</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Bénéfice</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleItems.map((item) => {
                    const totalItemSell = item.sellPrice * item.quantity
                    const totalItemBuy = item.product.buy_price * item.quantity
                    const itemProfit = totalItemSell - totalItemBuy

                    return (
                      <TableRow key={item.product.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Stock: {item.product.stock_qty}</p>
                          </div>
                        </TableCell>
                        <TableCell>{item.product.buy_price.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock_qty}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.sellPrice}
                            onChange={(e) => updateSellPrice(item.product.id, Number.parseFloat(e.target.value) || 0)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{totalItemSell.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell>
                          <span className={itemProfit >= 0 ? "text-green-600" : "text-red-600"}>
                            {itemProfit >= 0 ? "+" : ""}
                            {itemProfit.toLocaleString("fr-FR")} €
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProduct(item.product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
