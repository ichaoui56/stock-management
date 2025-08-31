"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Package } from "lucide-react"
import { useActionState, useEffect } from "react"
import { createProduct, updateProduct } from "@/lib/actions/product-actions"
import Link from "next/link"
import { Product } from "@/lib/actions/product-actions"
import { useRouter } from "next/navigation"

const initialState = {
  success: false,
  error: undefined,
}

interface ProductFormProps {
  product?: Product
  isEditing?: boolean
}

export function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  
  // Use different actions based on whether we're editing or creating
  const actionToUse = isEditing && product 
    ? updateProduct.bind(null, product.id)
    : createProduct

  const [state, formAction] = useActionState(actionToUse, initialState)

  // Handle successful form submission
  useEffect(() => {
    if (state.success) {
      // Show success message briefly, then redirect
      const timer = setTimeout(() => {
        router.push("/produits")
      }, 1500) // 1.5 seconds delay to show success message

      return () => clearTimeout(timer)
    }
  }, [state.success, router])

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/produits">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Modifier le Produit" : "Nouveau Produit"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing 
              ? "Modifiez les informations du produit" 
              : "Remplissez les informations du produit"
            }
          </p>
        </div>
      </div>

      {/* Form */}
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
              {/* Product name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Ex: Ordinateur Portable Dell" 
                  defaultValue={product?.name || ""}
                  required 
                />
              </div>

              {/* Buy price */}
              <div className="space-y-2">
                <Label htmlFor="buy_price">Prix d'achat (MAD) *</Label>
                <Input 
                  id="buy_price" 
                  name="buy_price" 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  placeholder="0.00" 
                  defaultValue={product?.buyPrice?.toString() || ""}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Stock quantity */}
              <div className="space-y-2">
                <Label htmlFor="stock_qty">Quantité en stock *</Label>
                <Input 
                  id="stock_qty" 
                  name="stock_qty" 
                  type="number" 
                  min="0" 
                  placeholder="0" 
                  defaultValue={product?.stockQty?.toString() || ""}
                  required 
                />
                {isEditing && (
                  <p className="text-sm text-muted-foreground">
                    Note: Modifier cette valeur créera un mouvement de stock automatiquement
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description détaillée du produit..."
                  rows={3}
                  defaultValue={product?.description || ""}
                />
              </div>
            </div>

            {/* Error/Success messages */}
            {state.error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{state.error}</p>
              </div>
            )}

            {state.success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">
                  {isEditing ? "Produit mis à jour avec succès ! Redirection..." : "Produit créé avec succès ! Redirection..."}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="gap-2" disabled={state.success}>
                <Save className="w-4 h-4" />
                {isEditing ? "Mettre à jour" : "Enregistrer le produit"}
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

      {/* Product info for editing */}
      {isEditing && product && (
        <Card>
          <CardHeader>
            <CardTitle>Informations Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Créé le:</span>
                <p>{new Date(product.createdAt).toLocaleDateString("fr-FR", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Dernière modification:</span>
                <p>{new Date(product.updatedAt).toLocaleDateString("fr-FR", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}