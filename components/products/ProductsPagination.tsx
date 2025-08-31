"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface ProductsPaginationProps {
  currentPage: number
  totalPages: number
  totalCount: number
  perPage: number
}

export function ProductsPagination({
  currentPage,
  totalPages,
  totalCount,
  perPage
}: ProductsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.replace(`/produits?${params.toString()}`, { scroll: false })
  }

  const changePerPage = (newPerPage: string) => {
    const params = new URLSearchParams(searchParams)
    if (newPerPage !== '10') {
      params.set('per_page', newPerPage)
    } else {
      params.delete('per_page')
    }
    // Reset to page 1 when changing per page
    params.delete('page')
    router.replace(`/produits?${params.toString()}`, { scroll: false })
  }

  // Calculate pagination range
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages)
      }
    }

    return rangeWithDots
  }

  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalCount)

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div>
          Affichage de {startItem} à {endItem} sur {totalCount} produits
        </div>
        
        <div className="flex items-center gap-2">
          <span>Éléments par page:</span>
          <Select value={perPage.toString()} onValueChange={changePerPage}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNumber, index) => (
            <div key={index}>
              {pageNumber === '...' ? (
                <span className="px-2 py-1 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigateToPage(pageNumber as number)}
                  className="h-8 w-8 p-0"
                >
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}