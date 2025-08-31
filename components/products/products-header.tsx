"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "@/hooks/use-debounced"
import Link from "next/link"

interface ProductsHeaderProps {
  initialSearch?: string
  initialStockFilter?: string
}

export function ProductsHeader({ 
  initialSearch = "", 
  initialStockFilter = "all" 
}: ProductsHeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [stockFilter, setStockFilter] = useState(initialStockFilter)

  // Debounced search function to avoid too many requests
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value && value.trim()) {
      params.set('search', value.trim())
    } else {
      params.delete('search')
    }
    
    // Reset to page 1 when searching
    params.delete('page')
    
    router.replace(`/produits?${params.toString()}`, { scroll: false })
  }, 300)

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    debouncedSearch(value)
  }

  // Handle stock filter changes
  const handleStockFilterChange = (value: string) => {
    setStockFilter(value)
    const params = new URLSearchParams(searchParams)
    
    if (value && value !== 'all') {
      params.set('stock', value)
    } else {
      params.delete('stock')
    }
    
    // Reset to page 1 when filtering
    params.delete('page')
    
    router.replace(`/produits?${params.toString()}`, { scroll: false })
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('page')
    router.replace(`/produits?${params.toString()}`, { scroll: false })
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("")
    setStockFilter("all")
    router.replace('/produits', { scroll: false })
  }

  // Export functionality (placeholder)
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export products with current filters:", { searchTerm, stockFilter })
  }

  const hasActiveFilters = searchTerm || stockFilter !== 'all'

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          {/* Recherche */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Filtre par stock */}
          <Select value={stockFilter} onValueChange={handleStockFilterChange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les produits</SelectItem>
              <SelectItem value="in_stock">En stock (&gt;10)</SelectItem>
              <SelectItem value="low_stock">Stock faible (1-10)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Link href="/produits/nouveau">
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Produit
            </Button>
          </Link>
        </div>
      </div>

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Filtres actifs:</span>
          {searchTerm && (
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
              <span>Recherche: "{searchTerm}"</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          {stockFilter !== 'all' && (
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
              <span>Stock: {
                stockFilter === 'in_stock' ? 'En stock' :
                stockFilter === 'low_stock' ? 'Stock faible' :
                'Rupture'
              }</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStockFilterChange('all')}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs h-6 px-2"
          >
            Tout effacer
          </Button>
        </div>
      )}
    </div>
  )
}