"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Package } from "lucide-react"
import { useActionState } from "react"
import { createProduct } from "@/lib/actions"
import Link from "next/link"

const initialState = {
  success: false,
  error: undefined,
}

export function ProductForm() {
  const [state, formAction] = useActionState(createProduct, initialState)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/produits">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Nouveau Produit</h1>
          <p className="text-muted-foreground">Remplissez les informations du produit</p>
        </div>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Informations du Produit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom du produit */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input id="name" name="name" placeholder="Ex: Ordinateur Portable Dell" required />
              </div>

              {/* Catégorie */}
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select name="category">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informatique">Informatique</SelectItem>
                    <SelectItem value="accessoires">Accessoires</SelectItem>
                    <SelectItem value="telephonie">Téléphonie</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="stockage">Stockage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description détaillée du produit..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Prix d'achat */}
              <div className="space-y-2">
                <Label htmlFor="buy_price">Prix d'achat (€) *</Label>
                <Input id="buy_price" name="buy_price" type="number" step="0.01" min="0" placeholder="0.00" required />
              </div>

              {/* Quantité initiale */}
              <div className="space-y-2">
                <Label htmlFor="stock_qty">Quantité initiale *</Label>
                <Input id="stock_qty" name="stock_qty" type="number" min="0" placeholder="0" required />
              </div>

              {/* Seuil d'alerte */}
              <div className="space-y-2">
                <Label htmlFor="min_stock_alert">Seuil d'alerte</Label>
                <Input
                  id="min_stock_alert"
                  name="min_stock_alert"
                  type="number"
                  min="0"
                  placeholder="10"
                  defaultValue="10"
                />
              </div>
            </div>

            {/* Code-barres */}
            <div className="space-y-2">
              <Label htmlFor="barcode">Code-barres (optionnel)</Label>
              <Input id="barcode" name="barcode" placeholder="Ex: 1234567890123" />
            </div>

            {/* Messages d'erreur/succès */}
            {state.error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{state.error}</p>
              </div>
            )}

            {state.success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">Produit créé avec succès !</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Enregistrer le produit
              </Button>
              <Link href="/produits">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
