"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Settings } from "lucide-react"
import { useState } from "react"

export function StockHeader() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movementFilter, setMovementFilter] = useState("all")

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

        {/* Filtre par type de mouvement */}
        <Select value={movementFilter} onValueChange={setMovementFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Type de mouvement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les mouvements</SelectItem>
            <SelectItem value="BUY">Achats</SelectItem>
            <SelectItem value="SELL">Ventes</SelectItem>
            <SelectItem value="ADJUST">Ajustements</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Exporter
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Settings className="w-4 h-4" />
          Ajuster Stock
        </Button>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter Stock
        </Button>
      </div>
    </div>
  )
}
