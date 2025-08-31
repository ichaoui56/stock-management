"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, X, FileDown, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "@/hooks/use-debounced"
import Link from "next/link"
import { toast } from "sonner"
import { exportProducts } from "@/lib/actions/product-actions"
import { generateProductsPDF } from "@/lib/pdf-export"

interface ProductsHeaderProps {
  initialSearch?: string
  initialStockFilter?: string
  // Add these props for PDF export
  currentProducts?: any[]
  currentStats?: {
    totalProducts: number
    totalStockValue: number
    totalUnits: number
    lowStockProducts: number
    outOfStockProducts: number
  }
}

export function ProductsHeader({
  initialSearch = "",
  initialStockFilter = "all",
  currentProducts = [],
  currentStats
}: ProductsHeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [stockFilter, setStockFilter] = useState(initialStockFilter)
  const [isExporting, setIsExporting] = useState(false)

  // Debounced search function
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value && value.trim()) {
      params.set('search', value.trim())
    } else {
      params.delete('search')
    }

    params.delete('page')
    router.push(`/produits?${params.toString()}`)
  }, 300)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    debouncedSearch(value)
  }

  const handleStockFilterChange = (value: string) => {
    setStockFilter(value)
    const params = new URLSearchParams(searchParams)

    if (value && value !== 'all') {
      params.set('stock', value)
    } else {
      params.delete('stock')
    }

    params.delete('page')
    router.push(`/produits?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchTerm("")
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('page')
    router.push(`/produits?${params.toString()}`)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setStockFilter("all")
    router.push('/produits')
  }

  // Enhanced export functionality with PDF generation
  const handleExport = async () => {
    if (!currentStats) {
      toast.error("Impossible d'exporter: statistiques non disponibles")
      return
    }

    setIsExporting(true)

    try {
      // Get all products matching current filters
      const result = await exportProducts({
        searchQuery: searchTerm,
        stockFilter: stockFilter !== 'all' ? stockFilter : undefined
      })

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Erreur lors de l\'export')
      }

      // Generate PDF
      const pdf = generateProductsPDF(
        result.data,
        currentStats,
        {
          searchQuery: searchTerm || undefined,
          stockFilter: stockFilter !== 'all' ? stockFilter : undefined
        }
      )

      // Create filename with timestamp and filters
      const timestamp = new Date().toISOString().slice(0, 10)
      let filename = `produits-${timestamp}`

      if (searchTerm) {
        filename += `-recherche-${searchTerm.toLowerCase().replace(/\s+/g, '-')}`
      }

      if (stockFilter !== 'all') {
        filename += `-${stockFilter}`
      }

      filename += '.pdf'

      // Download the PDF
      pdf.save(filename)

      toast.success(`PDF exporté avec succès: ${result.data.length} produits`)

    } catch (error) {
      console.error('Export error:', error)
      toast.error('Erreur lors de l\'export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  const hasActiveFilters = searchTerm || stockFilter !== 'all'

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          {/* Search */}
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

          {/* Stock Filter */}
          <Select value={stockFilter} onValueChange={handleStockFilterChange}>
            <SelectTrigger className="w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les produits</SelectItem>
              <SelectItem value="in_stock">En stock (&gt;10)</SelectItem>
              <SelectItem value="low_stock">Stock faible (1-10)</SelectItem>
              <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting || !currentStats}
            className="gap-2"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            {isExporting ? 'Export...' : 'Export PDF'}
          </Button>
          <Link href="/produits/nouveau">
            <Button variant="default" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Produit
            </Button>
          </Link>
        </div>
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm bg-muted/40 p-2 rounded-xl">
          <span className="font-medium text-muted-foreground">Filtres actifs:</span>

          {searchTerm && (
            <div className="flex items-center gap-1 bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full shadow-sm hover:bg-secondary transition">
              <span>Recherche: "{searchTerm}"</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-destructive/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {stockFilter !== 'all' && (
            <div className="flex items-center gap-1 bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full shadow-sm hover:bg-secondary transition">
              <span>
                Stock:{" "}
                {stockFilter === "in_stock"
                  ? "En stock"
                  : stockFilter === "low_stock"
                    ? "Stock faible"
                    : "Rupture"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStockFilterChange("all")}
                className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-destructive/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs h-7 px-3 rounded-full border-muted-foreground/30 hover:bg-destructive/10 hover:text-destructive transition"
          >
            Tout effacer
          </Button>
        </div>
      )}
    </div>
  )
}


// Package.json dependencies to add:
/*
npm install jspdf jspdf-autotable
npm install --save-dev @types/jspdf
*/

// Installation Instructions:
/*
1. Install required packages:
   npm install jspdf jspdf-autotable
   npm install --save-dev @types/jspdf

2. Create the lib/pdf-export.ts file with the PDF generation logic

3. Update your ProductsHeader component with the new export functionality

4. Update your ProductsContentWrapper to pass data to the header

5. Update your main page component structure

The PDF export will include:
- Professional header with your company branding
- Document metadata and applied filters
- Statistics section with key metrics in colored boxes
- Complete products table with all data
- Professional footer with page numbers and generation info
- Proper error handling and loading states
- Color-coded status indicators in the table
*/
