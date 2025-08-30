"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Upload } from "lucide-react"
import { useState } from "react"

export function ProductsHeader() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 gap-4">
        {/* Recherche */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtre par catégorie */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="informatique">Informatique</SelectItem>
            <SelectItem value="accessoires">Accessoires</SelectItem>
            <SelectItem value="telephonie">Téléphonie</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="stockage">Stockage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Upload className="w-4 h-4" />
          Importer
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Exporter
        </Button>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nouveau Produit
        </Button>
      </div>
    </div>
  )
}
